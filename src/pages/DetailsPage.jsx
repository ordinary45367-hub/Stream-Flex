import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { movieDetails } from "../services/api";
import { HeroBanner } from "../components/detail-page-component/HeroBanner";
import { Cast } from "../components/detail-page-component/Cast";
import { RecommendationMovie } from "../components/detail-page-component/RecommendationMovie";
import { Navbar } from "../components/Navbar";
export function DetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function loadMovieDetails() {
      const data = await movieDetails(movieId);
      setMovie(data);
    }
    loadMovieDetails();
  }, [movieId]);

  return (
    <>
      <Navbar />
      <HeroBanner movie={movie} />
      <Cast movie={movie} />
      <RecommendationMovie movie={movie} />
    </>
  );
}
