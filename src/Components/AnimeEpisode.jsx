import { Link, useParams } from "react-router-dom";
import EpisodeList from "./EpisodeList";
import HomePage from "./HomePage";
import '../Components/styles/animeEp.css';
import { useState } from "react";
//import animeIds from "../id-mapper/list-ids.json";

function AnimeEpisode() {

    const { id, title, ep, episodes } = useParams();
    const [vidPl, setVidPl] = useState("vidPl1");
    const animeIds = "123";
    const idsObj = animeIds?.find(({ mal_id }) => mal_id == id);

    const anilistId = idsObj?.anilist_id;
    const imdbId = idsObj?.imdb_id;
    const theMovieDbId = idsObj?.themoviedb_id;
    const seasonNum = (idsObj?.season?.tvdb && idsObj?.season?.tvdb != 0) ? idsObj?.season?.tvdb : 1;

    const pl3String = (idsObj?.type !== "MOVIE") ? `${import.meta.env.VITE_P3}/tv/${imdbId}/${seasonNum}-${ep}` : `${import.meta.env.VITE_P3}/movie/${imdbId}`;
    const pl4String = (idsObj?.type !== "MOVIE") ? `${import.meta.env.VITE_P4}/tv/${imdbId}&s=${seasonNum}&e=${ep}` : `${import.meta.env.VITE_P4}/movie/${imdbId}`;
    const pl5String = (idsObj?.type !== "MOVIE") ? `${import.meta.env.VITE_P5}/embedtv/${imdbId}&s=${seasonNum}&e=${ep}` : `${import.meta.env.VITE_P5}/embed/${imdbId}`;
    const pl6String = (idsObj?.type !== "MOVIE") ? `${import.meta.env.VITE_P6}/tv/${theMovieDbId}/${seasonNum}/}${ep}` : `${import.meta.env.VITE_P6}/movie/${theMovieDbId}`;

    const switchVidPl = (vidPl) => {
        switch (vidPl) {
            case "vidPl1":
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${import.meta.env.VITE_P1}/${anilistId}/${ep}/sub`} scrolling="no" allowFullScreen={true}></iframe></div>;
            case "vidPl2":
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${import.meta.env.VITE_P2}/${id}/${ep}/sub`} scrolling="no" allowFullScreen={true}></iframe></div>;
            case "vidPl3":
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${pl3String}`} allowFullScreen={true} ></iframe></div>;
            case "vidPl4":
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${pl4String}`} allowFullScreen={true}></iframe></div>;
            case "vidPl5":
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${pl5String}`} allowFullScreen={true}></iframe></div>;
            case "vidPl6":
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${pl6String}`} allowFullScreen={true}></iframe></div>;
            case "vidPl7":
                return <div className="iframe-container7">
                    <iframe className="iframe-content" src={`${import.meta.env.VITE_P7}/${anilistId}/${ep}`} allowFullScreen={true}></iframe></div>;
            case "vidPl8":
                return <div id="iframe-container6">
                    <iframe src={`${import.meta.env.VITE_P8}?id=${anilistId}&ep=${ep}`} scrolling="no" allowFullScreen={true}></iframe></div>;
            case "vidPl9":
                return <div id="iframe-container4">
                    <iframe src={`${import.meta.env.VITE_P9}/${title}/ep${ep}`} scrolling="no" allowFullScreen={true}></iframe></div>;

            case "vidPl10":
                return <div id="iframe-container5">
                    <iframe src={`${import.meta.env.VITE_P10}/${title}-episode-${ep}#subbed`} scrolling="no" allowFullScreen={true}></iframe></div>;

            case "vidPl11":
                return <div id="iframe-container6">
                    <iframe src={`${import.meta.env.VITE_P11}/?id=${anilistId}&ep=${ep}`} scrolling="no" allowFullScreen={true}></iframe></div>;

            case "vidPl12":
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${import.meta.env.VITE_P12}/${id}/${ep}`} scrolling="no" allowFullScreen={true} ></iframe></div>;

            case "vidPl13":
                return <div id="iframe-container4">
                    <iframe src={`${import.meta.env.VITE_P9}/${sessionStorage.getItem("title1Key")}/ep${ep}`} scrolling="no" allowFullScreen={true}></iframe></div>;

            case "vidPl14":
                return <div id="iframe-container5">
                    <iframe src={`${import.meta.env.VITE_P10}/${sessionStorage.getItem("title2Key")}-episode-${ep}#subbed`} scrolling="no" allowFullScreen={true}></iframe></div>;

            case "vidPl15":
                return <div id="iframe-container5">
                    <iframe src={`${import.meta.env.VITE_P10}/${sessionStorage.getItem("title3Key")}-episode-${ep}#subbed`} scrolling="no" allowFullScreen={true}></iframe></div>;

            case "vidPl16":
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${import.meta.env.VITE_13}/${anilistId}?&ep=${ep}`} allowFullScreen={true}></iframe></div>

            case "vidPl17":
                return <div id="iframe-container5">
                    <iframe src={`${import.meta.env.VITE_P10}/${sessionStorage.getItem("title4Key")}-episode-${ep}#subbed`} scrolling="no" allowFullScreen={true}></iframe></div>;

            case "vidPl18":
                return <div id="iframe-container4">
                    <iframe src={`${import.meta.env.VITE_P9}/${sessionStorage.getItem("title4Key")}/ep${ep}`} scrolling="no" allowFullScreen={true}></iframe></div>;

            case "dubPl1":
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${import.meta.env.VITE_P2}/${id}/${ep}/dub`} allowFullScreen={true} ></iframe></div>;
            case "dubPl2":
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${import.meta.env.VITE_P1}/${anilistId}/${ep}/dub`} allowFullScreen={true} ></iframe></div>;
            case "dubPl3":
                return <div id="iframe-container4">
                    <iframe src={`${import.meta.env.VITE_P9}/${title}-dub/ep${ep}`} scrolling="no" allowFullScreen={true}></iframe></div>;
            case "dubPl4":
                return <div id="iframe-container5">
                    <iframe src={`${import.meta.env.VITE_P10}/${title}-episode-${ep}#dubbed`} scrolling="no" allowFullScreen={true}></iframe></div>;
            default:
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${pl1String}`} scrolling="no" allowFullScreen={true}></iframe></div>;
        }
    }

    function handleVidPlChange(e) {
        setVidPl(e.target.value);
    }

    const nextPrevNavigation = () => {

        const prevEp = () => {
            if (Number(ep) > 1) {
                return <p id="prev-ep">{<Link to={`/anime/${id}/${title}/${Number(ep) - 1}/${episodes}`} >{`<< `}Episode:{`${Number(ep) - 1}`}</Link>}</p>
            }
        }

        const nextEp = () => {
            if (Number(ep) < Number(episodes)) {
                return <p id="next-ep">{<Link to={`/anime/${id}/${title}/${Number(ep) + 1}/${episodes}`}>Episode:{`${Number(ep) + 1}`}{` >>`}</Link>}</p>
            }
        }

        return (<div className="next-prev-container">
            {prevEp()}
            {nextEp()}
        </div>);
    }

    return (<>
        <HomePage />
        <div className="anime-container">
            <h2>ANIME EPISODE</h2>
            <div className="anime-main-container">
                <div className="anime-inner-container">
                    <p className="anime-info-lnk">Anime info: {<Link to={`/anime/${id}`}>{title.replaceAll("-", " ").toUpperCase()}</Link>}</p>
                    <select value={vidPl} onChange={handleVidPlChange}>
                        <option value="vidPl1">VidPl-1</option>
                        <option value="vidPl2">VidPl-2</option>
                        <option value="vidPl3">VidPl-3</option>
                        <option value="vidPl4">VidPl-4</option>
                        <option value="vidPl5">VidPl-5</option>
                        <option value="vidPl6">VidPl-6</option>
                        <option value="vidPl7">VidPl-7</option>
                        <option value="vidPl8">VidPl-8</option>
                        <option value="vidPl9">VidPl-9</option>
                        <option value="vidPl10">Pl-10</option>
                        <option value="vidPl11">Pl-11</option>
                        <option value="vidPl12">Pl-12</option>
                        <option value="vidPl13">Pl-13</option>
                        <option value="vidPl14">Pl-14</option>
                        <option value="vidPl15">Pl-15</option>
                        <option value="vidPl16">Pl-16</option>
                        <option value="vidPl17">Pl-17</option>
                        <option value="vidPl18">Pl-18</option>
                    </select>
                    <select value={vidPl} onChange={handleVidPlChange}>
                        <option>SUB</option>
                        <option value="dubPl1">DUB-1</option>
                        <option value="dubPl2">DUB-2</option>
                        <option value="dubPl3">DUB-3</option>
                        <option value="dubPl4">DUB-4</option>
                    </select>
                    {switchVidPl(vidPl)}
                    {nextPrevNavigation()}
                </div>
                <hr />
                <div className="episodes-container">
                    <EpisodeList title={title} episodes={episodes} />
                </div>
            </div>
        </div >
    </>);
}

export default AnimeEpisode