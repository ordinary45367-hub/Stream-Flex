import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { searchMovie } from "../services/api";
import { Navbar } from "../components/Navbar";
import { MovieGrid } from "../components/Search-Page/ResultGrid";
export function SearchPage() {
  const [searchParams] = useSearchParams();
  const [movie, setMovie] = useState([]);
  const title = searchParams.get("query");
  useEffect(() => {
    async function loadMovie() {
      const data = await searchMovie(title);
      setMovie(data.results);
      //console.log(movie);
    }
    loadMovie();
  }, [title]);

  return (
    <>
      <Navbar />
      <section className="text-white" style={{ marginTop: "70px" }}>
        <div>
          <h1 className="ms-3">Result for : {`${title}`}</h1>
        </div>
        <MovieGrid movie={movie} />
      </section>
    </>
  );
}
