import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { movieDetails } from "../services/api";
import { Navbar } from "../components/Navbar";

import "../components/TV.css";

function WatchMovies() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showName, setShowName] = useState("");

  //   const playerUrl = `https://vidsrc.sh/embed/movie/${encodeURIComponent(id)}`;
  const playerUrl = `https://vidsrc.sh/embed/movie?tmdb=${encodeURIComponent(id)}`;

  useEffect(() => {
    let cancelled = false;

    movieDetails(id)
      .then((show) => {
        if (!cancelled) setShowName(show.title);
      })
      .catch(() => {
        if (!cancelled) setShowName("Movie");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="tv-page watch-page" style={{ marginTop: "0" }}>
        <button className="tv-back" onClick={() => navigate(`/details/${id}`)}>
          ← Back to Movies
        </button>

        <div className="watch-heading">
          <div>
            <p className="tv-eyebrow">NOW SELECTED</p>
            <h1>{showName || "Loading series..."}</h1>
          </div>
        </div>

        <div className="player-frame">
          <iframe
            src={playerUrl}
            title={`${showName}`}
            allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </main>
    </>
  );
}

export default WatchMovies;
