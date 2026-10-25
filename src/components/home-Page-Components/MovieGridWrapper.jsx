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
    <>
      <section className="movie-grid-wrapper position-relative">
        <div class="section-header">
          <h2 class="section-title">{genereName} </h2>
          <div class="title-underline"></div>
        </div>
        <button
          onClick={scrollLeft}
          className="scroll-btn left-btn d-none "
          aria-label="Scroll left"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          onClick={scrollRight}
          className="scroll-btn right-btn  d-none "
          aria-label="Scroll right"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        <div className="movie-grid " ref={rowRef}>
          <MovieGrid generes={generes} />
        </div>
      </section>
    </>
  );
}
