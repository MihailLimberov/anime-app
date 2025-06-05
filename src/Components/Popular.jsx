import { useGlobalContext } from "../Context/Global";
import '../Components/styles/popular.css';
import { useEffect, useState } from "react";

function Popular({ rendered, prevPage }) {

    const { popularAnime, isSearch, searchResults, getPopularAnime, handleSubmit,
        searchPage, searchPageUp, searchPageDown, displayAnimes } = useGlobalContext();

    const [page, setPage] = useState(((rendered !== prevPage) ? 1 : Number(sessionStorage.getItem("typePageKey"))) || 1);

    useEffect(() => {
        const controller = new AbortController();
        setTimeout(() => {
            (!isSearch) ? getPopularAnime(controller.signal, page) : handleSubmit( controller.signal);
        }, 350);
        
        return () => { controller.abort() };
    }, [page, searchPage]);

    const conditionalRender = () => {

        return (!isSearch && rendered === "Popular") ? displayAnimes(popularAnime) : displayAnimes(searchResults);
    };

    return (
        <div>
            <div className="popular-stripe">
                <h3>{sessionStorage.getItem("rendKey")} Anime</h3>
                <div className="next-prev-pages">
                    <button className="prev-button" onClick={() => {
                        if (!isSearch) {
                            sessionStorage.setItem("typePageKey", String(Number(sessionStorage.getItem("typePageKey")) - 1));
                            setPage(Number(sessionStorage.getItem("typePageKey")));
                        }
                        else searchPageDown();

                    }} disabled={(!isSearch) ? (page === 1) : (sessionStorage.getItem("searchPageKey") === "1")}>{(!isSearch) ?
                        sessionStorage.getItem("typePageKey") : sessionStorage.getItem("searchPageKey")}</button>
                    <button className="next-button" onClick={() => {
                        if (!isSearch) {
                            sessionStorage.setItem("typePageKey", String(Number(sessionStorage.getItem("typePageKey")) + 1));
                            setPage(Number(sessionStorage.getItem("typePageKey")));
                        }
                        else searchPageUp();

                    }} disabled={(!isSearch) ? (!popularAnime?.length) : (!searchResults?.length)} >{(!isSearch) ?
                        Number(sessionStorage.getItem("typePageKey")) + 1 : Number(sessionStorage.getItem("searchPageKey")) + 1}</button>
                </div>
            </div>
            <div className="popular-anime">
                {conditionalRender()}
            </div>
        </div>
    );
}

export default Popular