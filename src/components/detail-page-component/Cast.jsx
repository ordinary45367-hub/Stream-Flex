import "./styles/Cast.css";
import { useRef } from "react";

export function Cast({ movie }) {
  const rowRef = useRef(null);

  function scrollLeft() {
    rowRef.current?.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  }
  function scrollRight() {
    rowRef.current?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  }
  return (
    <>
      <section className="cast-section mb-5 px-2 position-relative">
        <div>
          <h1 className="mb-4 ps-1">Top Cast</h1>
          <button
            onClick={scrollLeft}
            className="scroll-btn left-btn  d-none d-lg-block"
            aria-label="Scroll left"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={scrollRight}
            className="scroll-btn right-btn  d-none d-lg-block "
            aria-label="Scroll right"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <div
            id="cast"
            className="cast-wrapper d-flex gap-3 px-2"
            ref={rowRef}
          >
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
