import { Link } from "react-router";
import { Play } from "lucide-react";
import { HeroBanner } from "../home-Page-Components/HeroBanner";
import "./MovieGrid.css";
export function MovieGrid({ movie, tv }) {
  if (!movie || movie.length === 0) {
    return (
      <div>
        <h1>please wait to load movies...</h1>
      </div>
    );
  }
  if (!movie) return <main className="tv-page">Loading Movies details...</main>;

  return (
    <>
      <HeroBanner movies={movie} />
      <div>
        <div className="movie-result-grid mb-5">
          {movie
            .filter((movie) => {
              return movie.poster_path !== null;
            })
            .map((movie, index) => {
              return (
                <div className="movie-result-card" key={index}>
                  <Link
                    to={`/${movie.media_type === "tv" || tv ? "tv" : "details"}/${movie.id}`}
                  >
                    <img
                      className="movie-poster "
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt=""
                    />
                  </Link>

                  <p className="movie-card-title">
                    {tv ? movie.title || movie.name : movie.title}
                  </p>
                  <span>{movie.release_date}</span>
                </div>
              );
            })}
        </div>
        <div className="load-more-container"></div>
      </div>
    </>
  );
}
