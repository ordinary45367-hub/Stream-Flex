import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loadMovies } from "../../services/api.js";
import "./styles/MovieGrid.css";
import { IMAGE_BASE_URL } from "../../services/api.js";
export function MovieGrid({ generes }) {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const data = await loadMovies(generes);
      setMovies(data);
    };
    fetchMovies();
  }, [generes]);
  function showInfo(id) {
    navigate(`/details/${id}`);
  }
  return (
    <>
      {movies
        .filter((movie) => {
          return movie.poster_path !== null;
        })
        .map((movie, index) => {
          return (
            <div
              onClick={() => {
                showInfo(movie.id);
              }}
              className="movie-row-card  flex-shrink-0"
              key={index}
            >
              <img
                className="movie-poster card-img-tp"
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt=""
              />
              <p className="movie-card-title">{movie.title}</p>
              <span>{movie.release_date}</span>
            </div>
          );
        })}
    </>
  );
}
