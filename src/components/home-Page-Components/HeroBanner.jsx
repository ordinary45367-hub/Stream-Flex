import { useState, useEffect } from "react";
import { Link } from "react-router";
import { loadMovies } from "../../services/api";
import "./styles/HeroBanner.css";
import { Play } from "lucide-react";
export function HeroBanner({ movies }) {
  const [movie, setMovies] = useState([]);
  const date = new Date("2026-10-31");
  const today = new Date();
  console.log(date.getDate(), date.getMonth(), date.getFullYear());
  console.log(today > date);

  useEffect(() => {
    const fetchMovies = async () => {
      if (movies && movies.length > 0) {
        setMovies(movies);
      } else {
        const data = await loadMovies("popular");
        setMovies(data);
        console.log(data);
      }
    };
    fetchMovies();
  }, [movies]);

  return (
    <section
      className="hero-banner-search position-relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie[3]?.backdrop_path})`,
      }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{movie[3]?.name || movie[3]?.title}</h1>
        <p className="overview">{movie[3]?.overview}</p>
        <p className="overview">
          {movie[3]?.first_air_date || movie[3]?.release_date}
        </p>
        <Link
          to={
            movie[3]?.media_type === "tv"
              ? `/tv/${movie[3]?.id}`
              : `/watch/Movie/${movie[3]?.id}`
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
