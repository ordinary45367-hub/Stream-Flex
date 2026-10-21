import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getTVDetails } from "../services/api";
import { Navbar } from "../components/Navbar";

import "../components/TV.css";

export default function WatchEpisode() {
  const { id, season, episode } = useParams();
  const navigate = useNavigate();
  const [showName, setShowName] = useState("");

  const playerUrl = `https://vidsrc.sh/embed/tv/${encodeURIComponent(id)}/${encodeURIComponent(season)}/${encodeURIComponent(episode)}`;

  useEffect(() => {
    let cancelled = false;

    getTVDetails(id)
      .then((show) => {
        if (!cancelled) setShowName(show.name);
      })
      .catch(() => {
        if (!cancelled) setShowName("TV Series");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="tv-page watch-page">
        <button className="tv-back" onClick={() => navigate(`/tv/${id}`)}>
          ← Back to series
        </button>

        <div className="watch-heading">
          <div>
            <p className="tv-eyebrow">NOW SELECTED</p>
            <h1>{showName || "Loading series..."}</h1>
            <p>
              Season {season} · Episode {episode}
            </p>
          </div>
        </div>

        <div className="player-frame">
          <iframe
            src={playerUrl}
            title={`${showName} Season ${season} Episode ${episode}`}
            allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <p className="player-note">
          The video is provided by an external player. Availability and playback
          behavior depend on that provider.
        </p>
      </main>
    </>
  );
}
