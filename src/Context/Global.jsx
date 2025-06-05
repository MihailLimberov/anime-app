import { createContext, useContext, useReducer, useState } from "react";
import { Link } from "react-router-dom";

const GlobalContext = createContext();

const mainApiUrl = import.meta.env.VITE_API;

//actions for reducer
const SEARCH = "SEARCH";
const GET_ONGOING_ANIME = "GET_ONGOING_ANIME";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";

const reducer = (state, action) => {
    switch (action.type) {
        case GET_POPULAR_ANIME:
            return ({ ...state,  popularAnime: action.payload });
        case SEARCH:
            return ({ ...state,  searchResults: action.payload });
        case GET_UPCOMING_ANIME:
            return ({ ...state,  upcomingAnime: action.payload });
        case GET_ONGOING_ANIME:
            return ({ ...state,  ongoingAnime: action.payload });
        default:
            return state;
    }
}

export const GlobalContextProvider = ({ children }) => {

    const initialState = {
        ongoingAnime: [],
        popularAnime: [],
        upcomingAnime: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = useState("");
    const [searchPage, setSearchPage] = useState(Number(sessionStorage.getItem("searchPageKey")));

    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            state.isSearch = false;
            sessionStorage.setItem("searchPageKey", "1");
            setSearchPage(sessionStorage.getItem("searchPageKey"));
        }
    }

    const handleSubmit = (signal) => {
        if (search) {
            state.isSearch = true;
            searchAnime(search, signal);
        }
        else state.isSearch = false;
    }

    const searchPageUp = () => {
        sessionStorage.setItem("searchPageKey", String(Number(sessionStorage.getItem("searchPageKey")) + 1))
        setSearchPage(Number(sessionStorage.getItem("searchPageKey")));
    }

    const searchPageDown = () => {
        sessionStorage.setItem("searchPageKey", String(Number(sessionStorage.getItem("searchPageKey")) - 1))
        setSearchPage(Number(sessionStorage.getItem("searchPageKey")));
    }


    //fetch popular
    const getPopularAnime = async (signal, page) => {
        try {
            const response = await fetch(`${mainApiUrl}/top/anime?filter=bypopularity&page=${page}&limit=18&sfw`, { signal });
            const data = await response.json();
            dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
        }
        catch (err) {
            console.log(err);
        }
    }

    //fetch ongoing
    const getOngoingAnime = async (signal, page) => {
        try {
            const response = await fetch(`${mainApiUrl}/top/anime?filter=airing&page=${page}&limit=18&sfw`, { signal });
            const data = await response.json();
            dispatch({ type: GET_ONGOING_ANIME, payload: data.data });
        }
        catch (err) {
            console.log(err);
        }
    }

    //fetch upcoming
    const getUpcomingAnime = async (signal, page) => {
        try {
            const response = await fetch(`${mainApiUrl}/top/anime?filter=upcoming&page=${page}&limit=18&sfw`, { signal });
            const data = await response.json();
            dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
        }
        catch (err) {
            console.log(err);
        }
    }

    //search anime
    const searchAnime = async (animeQuery, signal) => {
        try {
            const response = await fetch(`${mainApiUrl}/anime?q=${animeQuery}&order_by=popularity&page=${sessionStorage.getItem("searchPageKey")}&limit=18&sort=asc&sfw`, { signal });
            const data = await response.json();
            dispatch({ type: SEARCH, payload: data.data });
        }
        catch (err) {
            console.log(err);
        }
    }


    const displayAnimes = (animeArr) => {

        const uniqueAnimeArr = animeArr?.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.mal_id === value.mal_id
            )));

        return uniqueAnimeArr?.map((anime) => {

            return <div className="anime-card" key={anime.mal_id}>
                <Link to={`/anime/${anime.mal_id}`}>
                    <img src={anime.images.jpg.image_url} alt="anime cover picture" />
                    <h3>{anime.title}</h3>
                    <p>Released: {anime?.aired?.prop?.from?.year ? anime?.aired?.prop?.from?.year : `...`}</p>
                </Link>
            </div >;
        });
    }


    return (
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            searchAnime,
            search,
            getPopularAnime,
            getOngoingAnime,
            getUpcomingAnime,
            displayAnimes,

            searchPage,
            searchPageUp,
            searchPageDown,
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => {

    return useContext(GlobalContext);
}