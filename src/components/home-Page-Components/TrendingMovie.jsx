import { MovieGridWrapper } from "./MovieGridWrapper";
export function TrendingMovies() {
  return (
    <>
      <MovieGridWrapper
        generes={"trending"}
        genereName={"Trending Movie Of Days"}
      />
    </>
  );
}
