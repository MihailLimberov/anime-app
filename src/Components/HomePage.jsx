import { useEffect, useState } from "react";
import Popular from "./Popular";
import { useGlobalContext } from "../Context/Global";
import '../Components/styles/homePage.css';
import Upcoming from "./Upcoming";
import Ongoing from "./Ongoing";
import { Link } from "react-router-dom";

function HomePage() {

    const { handleChange, handleSubmit, search } = useGlobalContext();

    const [rendered, setRendered] = useState(sessionStorage.getItem("rendKey") || "Popular");
    const [prevPage, setPrevPage] = useState(rendered || "undef");

    useEffect(() => {

        sessionStorage.setItem("rendKey", rendered);

        if (sessionStorage.getItem("searchPageKey") == null) {
            sessionStorage.setItem("searchPageKey", "1");
        }
        if (sessionStorage.getItem("typePageKey") == null) {
            sessionStorage.setItem("typePageKey", "1");
        }

        pageSaver();
    }, [rendered]);

    const pageSaver = () => {

        switch (rendered) {
            case "Popular":
                if (prevPage !== rendered) {
                    sessionStorage.setItem("typePageKey", "1");
                    sessionStorage.setItem("searchPageKey", "1");
                }
                setPrevPage("Popular");
                break;

            case "Upcoming":
                if (prevPage !== rendered) {
                    sessionStorage.setItem("typePageKey", "1");
                    sessionStorage.setItem("searchPageKey", "1");
                }
                setPrevPage("Upcoming");
                break;
            case "Ongoing":
                if (prevPage !== rendered) {
                    sessionStorage.setItem("typePageKey", "1");
                    sessionStorage.setItem("searchPageKey", "1");
                }
                setPrevPage("Ongoing");
                break;
        }
    }

    const switchComponent = () => {

        if (window.location.pathname === "/") {

            switch (rendered) {
                case "Popular":
                    return <Popular rendered={rendered} prevPage={prevPage} />

                case "Upcoming":
                    return <Upcoming rendered={rendered} prevPage={prevPage} />

                case "Ongoing":
                    return <Ongoing rendered={rendered} prevPage={prevPage} />

                default:
                    return <Popular rendered={rendered} prevPage={prevPage} />
            }
        }
    }

    const [disableButton, setDisableButton] = useState(false);

    return (<>
        <header className="home-page">
            <div className="logo">
                <h1>BuchonkAnime</h1>
            </div>
            <div className="search-container">
                <div className="search-container-buttons">
                    <div className="btn-type-container">
                        <Link to="/">
                            <button onClick={() => setRendered("Popular")}>Popular</button>
                        </Link>
                    </div>
                    <div className="btn-type-container">
                        <Link to="/">
                            <button onClick={() => setRendered("Ongoing")}>Ongoing</button>
                        </Link>
                    </div>
                    <div className="btn-type-container">
                        <Link to="/">
                            <button onClick={() => setRendered("Upcoming")}>Upcoming</button>
                        </Link>
                    </div>
                </div>
                <form className="search-form">
                    <input type="text" placeholder="Search Anime" value={search} onChange={handleChange} />
                    <Link to="/" className="lnk">
                        <button type="submit" disabled={disableButton} onClick={() => {
                            setDisableButton(true);
                            setTimeout(() => setDisableButton(false), 1000);
                            return handleSubmit();
                        }}>Search</button>
                    </Link>
                </form>
            </div>
        </header>
        <div className="type-anime-container">
            {switchComponent()}
        </div>
    </>);
}

export default HomePage