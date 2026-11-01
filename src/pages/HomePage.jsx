import { Navbar } from "../components/Navbar";
import { HeroBanner } from "../components/home-Page-Components/HeroBanner";
import { MovieGridWrapper } from "../components/home-Page-Components/MovieGridWrapper";

export function HomePage() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <MovieGridWrapper
        generes={"trending"}
        genereName={"Trending Movie Of Days"}
      />
      <MovieGridWrapper
        generes={"now_playing"}
        genereName={"Now Playing In Teater"}
      />
      <MovieGridWrapper generes={"popular"} genereName={"Popular Movies"} />
      <MovieGridWrapper generes={"upcoming"} genereName={"Upcoming Movies"} />
      <MovieGridWrapper generes={"top_rated"} genereName={"Top Rated Movies"} />
    </>
  );
}
