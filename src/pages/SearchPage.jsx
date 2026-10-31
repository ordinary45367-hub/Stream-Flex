import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { searchMovie } from "../services/api";
import { Navbar } from "../components/Navbar";
import { MovieGrid } from "../components/Search-Page/ResultGrid";
export function SearchPage() {
  const [searchParams] = useSearchParams();
  const [movie, setMovie] = useState([]);
  const [page, setPages] = useState(1);

  const title = searchParams.get("query");
  const tv = searchParams.get("tv");
  useEffect(() => {
    async function loadMovie() {
      const data = await searchMovie(title, tv);
      setMovie(data.results);
      //console.log(movie);
    }
    loadMovie();
  }, [title]);
  async function addPage() {
    const nextPage = page + 1;
    const moreMovies = await searchMovie(title, tv, nextPage);
    console.log(moreMovies);

    setMovie((prev) => {
      return [...prev, moreMovies.results].flatMap((page) => page);
    });

    setPages(nextPage);
  }
  return (
    <>
      <Navbar />
      <section className="text-white" style={{ marginTop: "70px" }}>
        <div>
          <h1 className="ms-3">Result for : {`${title}`}</h1>
        </div>
        <MovieGrid movie={movie} tv={true} />
        <div className="load-more-container">
          <button onClick={addPage} className="load-more-btn">
            <span>Show More</span>
            <svg
              className="arrow-icon"
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
      </section>
    </>
  );
}
