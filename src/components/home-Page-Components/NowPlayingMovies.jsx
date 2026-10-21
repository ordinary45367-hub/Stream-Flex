import { MovieGridWrapper } from "./MovieGridWrapper";
export function NowPlayingMovies() {
  return (
    <>
      <MovieGridWrapper
        generes={"now_playing"}
        genereName={"Now Playing In Teater"}
      />
    </>
  );
}
