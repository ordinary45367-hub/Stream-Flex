import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getTVShowWithEpisodes, getTVImage } from "../services/api";
import { Navbar } from "../components/Navbar";

import "../components/tvshow-page-component/TV.css";
export default function TVDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [error, setError] = useState("");
  const [openSeason, setOpenSeason] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setShow(null);
      setError("");

      try {
        const data = await getTVShowWithEpisodes(id);
        console.log(data);

        if (!cancelled) {
          setShow(data);
          const first = data.seasons?.find(
            (season) => season.season_number > 0,
          );
          setOpenSeason(
            first?.season_number ?? data.seasons?.[0]?.season_number,
          );
        }
      } catch {
        if (!cancelled) setError("Unable to load this series.");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) return <main className="tv-page">{error}</main>;
  if (!show) return <main className="tv-page">Loading series details...</main>;

  return (
    <>
      <Navbar />
      <main className="tv-page">
        <button className="tv-back" onClick={() => navigate("/tv")}>
          ← All TV shows
        </button>

        <section
          className="tv-hero"
          style={{
            backgroundImage: show.backdrop_path
              ? `linear-gradient(90deg, #101014 5%, rgba(16,16,20,.76) 55%, rgba(16,16,20,.2)), url("${getTVImage(show.backdrop_path, "original")}")`
              : "linear-gradient(120deg, #28151d, #101014)",
          }}
        >
          <div className="tv-hero-content">
            <p className="tv-eyebrow">STREAMFLIX ORIGINALS & FAVORITES</p>
            <h1>{show.name}</h1>
            <p className="tv-meta">
              ★ {show.vote_average?.toFixed(1)} ·{" "}
              {show.first_air_date?.slice(0, 4)}
              {" · "}
              {show.number_of_seasons} seasons
              {" · "}
              {show.number_of_episodes} episodes
            </p>
            <p
              className="tv-overview"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {show.overview || "No description is available for this series."}
            </p>
          </div>
        </section>

        <section className="tv-season-section">
          <div className="tv-section-heading">
            <div>
              <p className="tv-eyebrow">EXPLORE THE STORY</p>
              <h2>Seasons & Episodes</h2>
            </div>
          </div>

          {(show.seasons ?? []).map((season) => (
            <section className="tv-season" key={season.id}>
              <button
                className="tv-season-toggle"
                onClick={() =>
                  setOpenSeason((current) =>
                    current === season.season_number
                      ? null
                      : season.season_number,
                  )
                }
                aria-expanded={openSeason === season.season_number}
              >
                <span>
                  <strong>{season.name}</strong>
                  <small>
                    {season.episodes?.length ?? season.episode_count} episodes
                  </small>
                </span>
                <span>{openSeason === season.season_number ? "−" : "+"}</span>
              </button>

              {openSeason === season.season_number && (
                <div className="tv-episodes">
                  {(season.episodes ?? []).map((episode) => (
                    <button
                      className="tv-episode"
                      key={episode.id}
                      onClick={() =>
                        navigate(
                          `/watch/tv/${show.id}/${season.season_number}/${episode.episode_number}`,
                        )
                      }
                    >
                      <div className="tv-episode-image">
                        {episode.still_path ? (
                          <img
                            src={getTVImage(episode.still_path, "w300")}
                            alt=""
                            loading="lazy"
                          />
                        ) : (
                          <span>▶</span>
                        )}
                      </div>

                      <div className="tv-episode-info">
                        <h3>
                          {episode.episode_number}. {episode.name}
                        </h3>
                        <p>
                          {episode.overview ||
                            "Episode description unavailable."}
                        </p>
                        <small>
                          {episode.air_date || "Air date unknown"}
                          {episode.runtime ? ` · ${episode.runtime} min` : ""}
                        </small>
                      </div>

                      <span className="tv-play">▶</span>
                    </button>
                  ))}
                </div>
              )}
            </section>
          ))}
        </section>
      </main>
    </>
  );
}
