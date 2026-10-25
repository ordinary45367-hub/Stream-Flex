import { useRef } from "react";
import { MovieGrid } from "./MovieRow";
import "./styles/MovieGrid.css";

export function MovieGridWrapper({ generes, genereName }) {
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
    <section className="movie-grid-wrapper position-relative">
      <h1 className="movies-generes-title">{genereName}</h1>

      <button
        onClick={scrollLeft}
        className="scroll-btn left-btn d-none d-lg-block"
        aria-label="Scroll left"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button
        onClick={scrollRight}
        className="scroll-btn right-btn  d-none d-lg-block"
        aria-label="Scroll right"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>

      <div
        className="movie-grid d-flex gap-3 overflow-x-auto overflow-y-hidden flex-nowrap"
        ref={rowRef}
      >
        <MovieGrid generes={generes} />
      </div>
    </section>
  );
}
