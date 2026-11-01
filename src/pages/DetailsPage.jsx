import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { movieDetails, loadRecommendations } from "../services/api";
import { HeroBanner } from "../components/detail-page-component/HeroBanner";
import { Cast } from "../components/detail-page-component/Cast";
import { RecommendationMovie } from "../components/detail-page-component/RecommendationMovie";
import { Navbar } from "../components/Navbar";
export function DetailsPage() {
  const [movie, setMovie] = useState(null);
  const [page, setPages] = useState(1);

  const { movieId } = useParams();

  useEffect(() => {
    async function loadMovieDetails() {
      const data = await movieDetails(movieId, page);
      setMovie(data);
    }
    loadMovieDetails();
  }, [movieId]);
  async function addPage() {
    const nextPage = page + 1;

    const recomendMovies = await loadRecommendations(movieId, nextPage);
    setMovie((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        recommendations: {
          ...prev.recommendations,
          results: [...prev.recommendations.results, ...recomendMovies.results],
        },
      };
    });

    setPages(nextPage);
  }
  if (!movie) return <main className="tv-page">Loading series details...</main>;
  return (
    <>
      <Navbar />
      <HeroBanner movie={movie} />
      <Cast movie={movie} />
      <RecommendationMovie movie={movie} />
      <div className="load-more-container">
        <button onClick={addPage} className="load-more-btn">
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
