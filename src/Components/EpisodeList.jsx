import { Link, useParams } from "react-router-dom";

function EpisodeList({ title, episodes }) {

    const { id, ep } = useParams();
    let episodesArr = [];
    for (let i = 1; i <= episodes; i++) {
        episodesArr[i] = i;
    }


    const stylesCurrentEp = {
        color: "white",
        backgroundColor: "#ffb700",
        border: "solid",
        borderColor: "#ffb700",
    }


    return (episodesArr.map((_ep) => {
        if (Number(ep) === _ep) {
            return <Link to={`/anime/${id}/${title}/${_ep}/${episodes}`} style={stylesCurrentEp} className="episode" key={_ep}>
                <li>EP: {_ep}</li>
            </Link>
        }
        else return <Link to={`/anime/${id}/${title}/${_ep}/${episodes}`} className="episode" key={_ep}>
            <li>EP: {_ep}</li>
        </Link>
    }));
}

export default EpisodeList