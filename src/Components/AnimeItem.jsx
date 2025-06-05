import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../Components/styles/animeItem.css';
import HomePage from "./HomePage";
import EpisodeList from "./EpisodeList";


function AnimeItem() {

    const { id } = useParams();

    const [anime, setAnime] = useState({});
    const [readMore, setReadMore] = useState(false);

    //destructuring anime
    const { title, title_english, episodes, synopsis,
        genres, images,
        season, year, aired, status, } = anime || {};

    const titleURL = title?.toLowerCase().replaceAll(" ", "-").replaceAll("☆", "-").replaceAll("/", "-").
        replaceAll(":", "").replaceAll(";", "").replaceAll("'", "").replaceAll("!", "").replaceAll(",", "").replaceAll(".", "")
        .replaceAll("?", "").replaceAll("(", "").replaceAll(")", "");

    const titleSlash = title?.toLowerCase().replaceAll(" ", "-").replaceAll("☆", "-").replaceAll("/", "").
        replaceAll(":", "").replaceAll(";", "").replaceAll("'", "").replaceAll("!", "").replaceAll(",", "").replaceAll(".", "")
        .replaceAll("?", "").replaceAll("(", "").replaceAll(")", "");

    const getAnime = async (signal) => {
        try {
            //search anime by id
            const response = await fetch(`${import.meta.env.VITE_API}/anime/${id}`, { signal });
            const animeData = await response.json();
            setAnime(animeData.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        setTimeout(() => { getAnime(controller.signal); }, 350);

        return () => { controller.abort() }
    }, []);


    const getTypeAnime = () => {
        return genres?.map((genre, index) => (index !== genres?.length - 1) ? genre?.name + ", " : genre?.name);
    }

    const transformTitle = (txtTitle) => {
        txtTitle = txtTitle?.toLowerCase();
        let str = "";
        let resultStr = "";

        for (let i = 0; i < txtTitle?.length; i++) {
            if (txtTitle[i] === "/") {
                str += "";
            }
            else if ((txtTitle[i].charCodeAt(0) >= "a".charCodeAt(0) && txtTitle[i].charCodeAt(0) <= "z".charCodeAt(0)) ||
                (txtTitle[i].charCodeAt(0) >= "0".charCodeAt(0) && txtTitle[i].charCodeAt(0) <= "9".charCodeAt(0))) {
                str += txtTitle[i];
            }
            else str += " ";
        }

        let splitArr = str.split(" ");
        splitArr = splitArr.filter(el => el !== "");

        for (let i = 0; i < splitArr.length; i++) {
            if (i === splitArr.length - 1) {
                resultStr += splitArr[i];
            }
            else resultStr += splitArr[i] + "-";

        }
        return resultStr;
    }

    //modify different titles to insert in the AnimeEpisode Component
    sessionStorage.setItem("title1Key", transformTitle(title));
    sessionStorage.setItem("title2Key", transformTitle(titleSlash));

    return (<>
        <HomePage />
        <div className="anime-container">
            <h2>ANIME INFO</h2>
            <div className="anime-main-container">
                <div className="anime-info">
                    <div className="large-image">
                        <img src={images?.jpg.large_image_url} alt="large-anime-image" />
                    </div>
                    <p><span>Title: </span><b>{title}</b></p>
                    <p><span>Other Name: </span><b>{title_english}</b></p>
                    <p><span>Type: </span>{getTypeAnime()}</p>
                    <p><span>Released: </span>{season ? `${season.charAt(0).toUpperCase() + season.slice(1)} ${year}` : aired?.prop?.from?.year ? `${aired?.prop?.from?.day}.${aired?.prop?.from?.month}.${aired?.prop?.from?.year}` : "..."}</p>
                    <p><span>Status: </span>{status}</p>
                    <p className="description">
                        <span>Description: </span>{readMore ? synopsis : synopsis?.slice(0, 300) + "..."}
                        <button onClick={() => { setReadMore(!readMore) }}>
                            {readMore ? "Show Less" : "Read More"}
                        </button>
                    </p>
                </div>
                <hr />
                <div className="episodes-container">
                    <EpisodeList title={titleURL} episodes={episodes} />
                </div>
            </div>
        </div>
    </>);
}

export default AnimeItem