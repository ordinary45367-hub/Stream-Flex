import "./styles/Cast.css";
import { Link } from "react-router";
export function RecommendationMovie({ movie }) {
  return (
    <>
      <section className="cast-section p-2">
        <div>
          <h1>Simmilar Movies</h1>
          <div className="recomendation-movie-wrapper ">
            {movie?.recommendations?.results
              .filter((movie) => {
                return movie.profile_path !== null;
              })
              .map((movie) => {
                return (
                  <div className="cast-card" key={movie.id}>
                    <Link to={`/details/${movie.id}`}>
                      <img
                        className="rounded"
                        src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                        alt=""
                      />
                    </Link>
                    <p>{movie.original_title}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
