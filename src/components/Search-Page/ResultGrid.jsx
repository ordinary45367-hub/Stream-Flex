import { Link } from "react-router";
import { Play } from "lucide-react";
import "./MovieGrid.css";
export function MovieGrid({ movie, tv }) {
  if (!movie) {
    return (
      <div>
        <h1>please wait to load movies...</h1>
      </div>
    );
  }
  console.log(movie);

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
          <Link
            to={tv ? `/tv/${movie[0]?.id}` : `/watch/Movie/${movie[0]?.id}`}
            className="play-btn"
          >
            <Play className="play-icon" size={18} fill="white" color="white" />
            <span>Play</span>{" "}
          </Link>
        </div>
      </section>
      <div>
        <div className="movie-grid mb-5">
          {movie
            .filter((movie) => {
              return movie.poster_path !== null;
            })
            .map((movie, index) => {
              return (
                <div className="movie-card" key={index}>
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
