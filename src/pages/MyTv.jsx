import { useState, useEffect } from "react";
import { MovieGrid } from "../components/Search-Page/ResultGrid";
import { Navbar } from "../components/Navbar";
import { loadTVShows } from "../services/api";

export function TvShows() {
  const [populars, setpopular] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [topRateds, setTopRated] = useState([]);
  const [currents, setCurrent] = useState([]);
  const [page, setPages] = useState(1);

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

  return (
    <>
      <Navbar />

      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.7rem)", marginTop: "70px" }}>
        Airing Today Tv Shows
      </h1>

      <MovieGrid movie={airingToday} tv={"tv"} />
      <div className="load-more-container">
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

      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.7rem)" }}>
        Current on air Tv Shows
      </h1>
      <MovieGrid movie={currents} tv />
      <div className="load-more-container">
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

      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.7rem)" }}>
        Popular Tv Shows
      </h1>
      <MovieGrid movie={populars} tv={"tv"} />
      <div className="load-more-container">
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

      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.7rem)" }}>
        Top Rated Tv Shows
      </h1>
      <MovieGrid movie={topRateds} tv={"tv"} />
      <div className="load-more-container">
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
    </>
  );
}
