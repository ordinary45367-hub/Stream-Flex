import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MovieGrid } from "../components/Search-Page/ResultGrid";
import { getMoviesByGenre } from "../services/api";
import { Navbar } from "../components/Navbar";
export function MovieGenrePage() {
  const [movie, setMovie] = useState([]);
  const [page, setPages] = useState(1);
  const { id } = useParams();
  useEffect(() => {
    const loadMovie = async () => {
      const data = await getMoviesByGenre(id, page);
      setMovie(data);
    };
    loadMovie();
  }, [id]);
  async function addPage() {
    const nextPage = page + 1;
    const moreMovies = await getMoviesByGenre(id, nextPage);

    setMovie((prev) => {
      return [...prev, moreMovies].flatMap((page) => page);
    });

    setPages(nextPage);
  }

  return (
    <>
      <Navbar />

      <MovieGrid movie={movie} />

      <div class="load-more-container">
        <button onClick={addPage} className="load-more-btn">
          <span>Show More</span>
          <svg
            class="arrow-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
    </>
  );
}
