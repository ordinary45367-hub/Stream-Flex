import { Navbar } from "../components/Navbar";
import { HeroBanner } from "../components/home-Page-Components/HeroBanner";
import { NowPlayingMovies } from "../components/home-Page-Components/NowPlayingMovies";
import { PopularMovies } from "../components/home-Page-Components/PopularMovies";
import { UpcomingMovies } from "../components/home-Page-Components/UpcomingMovies";
import { TopRatedMovies } from "../components/home-Page-Components/TopRatedMovies";
import { TrendingMovies } from "../components/home-Page-Components/TrendingMovie";

export function HomePage() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <TrendingMovies />
      <NowPlayingMovies />
      <PopularMovies />
      <UpcomingMovies />
      <TopRatedMovies />
    </>
  );
}
