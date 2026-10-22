import { useState, useEffect } from "react";
import { MovieGrid } from "../components/Search-Page/ResultGrid";
import { Navbar } from "../components/Navbar";
import { loadTVShows } from "../services/api";

export function TvShows() {
  const [populars, setpopular] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [topRateds, setTopRated] = useState([]);
  const [currents, setCurrent] = useState([]);
  useEffect(() => {
    const fetchTvSeries = async () => {
      const popular = await loadTVShows();
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
      <h1>Popular Tv Shows</h1>
      <MovieGrid movie={populars} tv={"tv"} />
      <h1>Current on air Tv Shows</h1>

      <MovieGrid movie={currents} tv={"tv"} />
      <h1>Airing Today Tv Shows</h1>

      <MovieGrid movie={airingToday} tv={"tv"} />
      <h1>Top Rated Tv Shows</h1>

      <MovieGrid movie={topRateds} tv={"tv"} />
    </>
  );
}
