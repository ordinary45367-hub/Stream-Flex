import { Link } from "react-router";
import { Play } from "lucide-react";
// import { IMAGE_BASE_URL } from "../../services/api";
import "./MovieGrid.css";
export function MovieGrid({ movie, tv }) {
  return (
    <>
      <section
        className="hero-banner-search position-relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie[0]?.backdrop_path})`,
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">{movie[0]?.title}</h1>
          <p className="overview">{movie[0]?.overview}</p>
          <p className="overview">{movie[0]?.release_date}</p>
          <a
            href={
              tv
                ? `/tv/${movie[0]?.id}`
                : `https://vidsrc.sh/embed/movie?tmdb=${movie[0]?.id}`
            }
            className="play-btn"
          >
            <Play className="play-icon" size={18} fill="white" color="white" />
            <span>Play</span>{" "}
          </a>
        </div>
      </section>
      <div className="">
        <div className="movie-grid mb-5">
          {movie
            .filter((movie) => {
              return movie.profile_path !== null;
            })
            .map((movie, index) => {
              return (
                <div className="movie-card" key={index}>
                  <Link to={`/${tv ? "tv" : "details"}/${movie.id}`}>
                    <img
                      className="movie-poster "
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt=""
                    />
                  </Link>

                  <p className="movie-card-title">{movie.title}</p>
                  <span>{movie.release_date}</span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
