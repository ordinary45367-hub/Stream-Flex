import { useState, useEffect } from "react";
import { loadMovies } from "../../services/api";
import "./styles/HeroBanner.css";
import { Play } from "lucide-react";
export function HeroBanner() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const data = await loadMovies("trending");
      setMovies(data);
      // console.log(data);
    };
    fetchMovies();
  }, []);

  return (
    <section className="hereo-banner-section">
      <div className="hereo-banner">
        <img
          className="hero-image"
          src={`https://image.tmdb.org/t/p/original${movies[0]?.backdrop_path}`}
          alt=""
        />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">{movies[0]?.title}</h1>
        <p className="overview">{movies[0]?.overview}</p>
        <p className="overview">{movies[0]?.release_date}</p>
        <a
          href={`https://vidsrc.sh/embed/movie?tmdb=${movies[0]?.id}`}
          className="play-btn"
        >
          <Play className="play-icon" size={18} fill="white" color="white" />
          <span>Play</span>{" "}
        </a>
      </div>
    </section>
  );
}
