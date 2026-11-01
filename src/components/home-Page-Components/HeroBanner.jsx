import { useState, useEffect } from "react";
import { Link } from "react-router";
import { loadMovies } from "../../services/api";
import "./styles/HeroBanner.css";
import { Play } from "lucide-react";
export function HeroBanner({ movies, tv }) {
  const [movie, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (movies && movies.length > 0) {
        setMovies(movies);
      } else {
        const data = await loadMovies("trending");
        setMovies(data);
      }
      // console.log(data);
    };
    fetchMovies();
  }, [movies]);

  return (
    <section
      className="hero-banner-search position-relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie[0]?.backdrop_path})`,
      }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{movie[0]?.name || movie[0]?.title}</h1>
        <p className="overview">{movie[0]?.overview}</p>
        <p className="overview">
          {movie[0]?.first_air_date || movie[0]?.release_date}
        </p>
        <Link
          to={
            movie[0]?.media_type === "tv"
              ? `/tv/${movie[0]?.id}`
              : `/watch/Movie/${movie[0]?.id}`
          }
          className="play-btn"
        >
          <Play className="play-icon" size={18} fill="white" color="white" />
          <span>Play</span>{" "}
        </Link>
      </div>
    </section>
  );
}
