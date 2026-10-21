import "./styles/Cast.css";
export function Cast({ movie }) {
  return (
    <>
      <section className="cast-section mb-5 px-2">
        <div>
          <h1 className="mb-4 ps-1">Top Cast</h1>
          <small className="view">view all</small>
          <div id="cast" className="cast-wrapper d-flex gap-3 px-2">
            {movie?.credits?.cast
              .filter((cast) => {
                return cast.profile_path !== null;
              })
              .map((cast) => {
                return (
                  <div className="cast-card" key={cast.id}>
                    {}
                    <img
                      className="rounded"
                      src={`https://image.tmdb.org/t/p/w185/${cast.profile_path}`}
                      alt=""
                    />
                    <p>{cast.original_name}</p>
                    <small>{cast.character}</small>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
