import { Link, useParams } from "react-router-dom";
import EpisodeList from "./EpisodeList";
import HomePage from "./HomePage";
import '../Components/styles/animeEp.css';
import { useState } from "react";

function AnimeEpisode() {

    const { id, title, ep, episodes } = useParams();
    const [vidPl, setVidPl] = useState("vidPl1");

    const switchVidPl = (vidPl) => {
        switch (vidPl) {
            case "vidPl1":
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${import.meta.env.VITE_P1}/${title}-episode-${ep}`} allowFullScreen={true} ></iframe></div>;
            case "vidPl2":
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${import.meta.env.VITE_P2}/anime/${title}-episode-${ep}`} allowFullScreen={true}></iframe></div>;
            case "vidPl3":
                return <div id="iframe-container3">
                    <iframe src={`${import.meta.env.VITE_P3}?id=${id}&ep=${ep}`} scrolling="no" allowFullScreen={true}></iframe></div>;
            case "vidPl4":
                return <div id="iframe-container4">
                    <iframe src={`${import.meta.env.VITE_P4}/${title}/ep${ep}`} scrolling="no" allowFullScreen={true}></iframe></div>;

            case "vidPl5":
                return <div id="iframe-container5">
                    <iframe src={`${import.meta.env.VITE_P5}/${title}-episode-${ep}#subbed`} scrolling="no" allowFullScreen={true}></iframe></div>;

            case "vidPl6":
                return <div id="iframe-container6">
                    <iframe src={`${import.meta.env.VITE_P6}/${id}/a1/k${ep}/`} scrolling="no" allowFullScreen={true}></iframe></div>;

            case "vidPl7":
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${import.meta.env.VITE_P1}/${sessionStorage.getItem("title1Key")}-episode-${ep}`} allowFullScreen={true} ></iframe></div>;

            case "vidPl8":
                return <div id="iframe-container4">
                    <iframe src={`${import.meta.env.VITE_P4}/${sessionStorage.getItem("title1Key")}/ep${ep}`} scrolling="no" allowFullScreen={true}></iframe></div>;

            case "vidPl9":
                return <div id="iframe-container5">
                    <iframe src={`${import.meta.env.VITE_P5}/${sessionStorage.getItem("title2Key")}-episode-${ep}#subbed`} scrolling="no" allowFullScreen={true}></iframe></div>;

            case "vidPl10":
                return <div id="iframe-container5">
                    <iframe src={`${import.meta.env.VITE_P5}/${sessionStorage.getItem("title3Key")}-episode-${ep}#subbed`} scrolling="no" allowFullScreen={true}></iframe></div>;

            case "dubPl1":
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${import.meta.env.VITE_P1}/${title}-dub-episode-${ep}`} allowFullScreen={true} ></iframe></div>;
            case "dubPl2":
                return <div id="iframe-container4">
                    <iframe src={`${import.meta.env.VITE_P4}/${title}-dub/ep${ep}`} scrolling="no" allowFullScreen={true}></iframe></div>;
            case "dubPl3":
                return <div id="iframe-container5">
                    <iframe src={`${import.meta.env.VITE_P5}/${title}-episode-${ep}#dubbed`} scrolling="no" allowFullScreen={true}></iframe></div>;
            default:
                return <div className="iframe-container">
                    <iframe className="iframe-content" src={`${import.meta.env.VITE_P1}/${title}-episode-${ep}`} scrolling="no" allowFullScreen={true}></iframe></div>;
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
                    </select>
                    <select value={vidPl} onChange={handleVidPlChange}>
                        <option>SUB</option>
                        <option value="dubPl1">DUB-1</option>
                        <option value="dubPl2">DUB-2</option>
                        <option value="dubPl3">DUB-3</option>
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