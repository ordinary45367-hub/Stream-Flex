import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MovieGrid } from "../components/Search-Page/ResultGrid";
import { Navbar } from "../components/Navbar";
import { loadTVShows } from "../services/api";

export function TvShows() {
  const [populars, setpopular] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [topRateds, setTopRated] = useState([]);
  const [currents, setCurrent] = useState([]);
  const [page, setPages] = useState(1);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchTvSeries = async () => {
      const popular = await loadTVShows("popular");
      const topRated = await loadTVShows("top_rated");
      const airingTodays = await loadTVShows("airing_today");
      const current = await loadTVShows("on_the_air");
      setCurrent(current);
      setAiringToday(airingTodays);
      setTopRated(topRated);
      setpopular(popular);
    };
    fetchTvSeries();
  }, []);
  const navigate = useNavigate();

  function handleSearch(e) {
    e?.preventDefault();
    if (input.trim()) {
      navigate(`/search?query=${encodeURIComponent(input)}&tv=${"tv"}`);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }
  return (
    <>
      <Navbar />

      <div className="search-box  search-box-tv mx-5 mt-5 mb-4 p-2 px-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          className="search-input w-100"
          placeholder="Search movies..."
        />
        <button onClick={handleSearch} aria-label="Search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <h1 className="">Airing Today Tv Shows</h1>
      <MovieGrid movie={airingToday} tv={"tv"} />
      <div class="load-more-container">
        <button
          onClick={async () => {
            const nextPage = page + 1;
            const moreMovies = await loadTVShows("top_rated", nextPage);
            setAiringToday((prev) => {
              return [...prev, moreMovies].flatMap((page) => page);
            });

            setPages(nextPage);
          }}
          className="load-more-btn"
        >
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
      <h1>Current on air Tv Shows</h1>
      <MovieGrid movie={currents} tv={"tv"} />
      <div class="load-more-container">
        <button
          onClick={async () => {
            const nextPage = page + 1;
            const moreMovies = await loadTVShows("on_the_air", nextPage);
            setCurrent((prev) => {
              return [...prev, moreMovies].flatMap((page) => page);
            });

            setPages(nextPage);
          }}
          className="load-more-btn"
        >
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
      <h1>Popular Tv Shows</h1>
      <MovieGrid movie={populars} tv={"tv"} />
      <div class="load-more-container">
        <button
          onClick={async () => {
            const nextPage = page + 1;
            const moreMovies = await loadTVShows("popular", nextPage);
            setpopular((prev) => {
              return [...prev, moreMovies].flatMap((page) => page);
            });

            setPages(nextPage);
          }}
          className="load-more-btn"
        >
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
      <h1>Top Rated Tv Shows</h1>
      <MovieGrid movie={topRateds} tv={"tv"} />
      <div class="load-more-container">
        <button
          onClick={async () => {
            const nextPage = page + 1;
            const moreMovies = await loadTVShows("top_rated", nextPage);
            setTopRated((prev) => {
              return [...prev, moreMovies].flatMap((page) => page);
            });

            setPages(nextPage);
          }}
          className="load-more-btn"
        >
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
