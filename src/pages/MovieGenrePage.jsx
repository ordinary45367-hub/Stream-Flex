import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MovieGrid } from "../components/Search-Page/ResultGrid";
import { getMoviesByGenre } from "../services/api";
import { Navbar } from "../components/Navbar";
export function MovieGenrePage() {
  const [movie, setMovie] = useState([]);
  const { id, name } = useParams();
  useEffect(() => {
    const loadMovie = async () => {
      let promises = [];
      for (let i = 1; i < 6; i++) {
        promises.push(getMoviesByGenre(id, i));
      }

      const allPage = await Promise.all(promises);
      const data = allPage.flatMap((page) => page);
      console.log(allPage);
      setMovie(data);
    };
    loadMovie();
  }, [id]);
  return (
    <>
      <Navbar />
      <h1>{name}</h1>
      <MovieGrid movie={movie} />
    </>
  );
}
