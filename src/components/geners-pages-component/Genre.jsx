import { useNavigate } from "react-router";
import {
  Zap,
  Compass,
  Laugh,
  Ghost,
  Heart,
  Orbit,
  Drama,
  Sparkles,
  Shield,
  Landmark,
  Users,
  Music,
  Search,
  // Rocket,
  Clapperboard,
} from "lucide-react";

import "./styles/Genres.css";

const genres = [
  { id: 28, name: "Action", icon: Zap, color: "red" },
  { id: 12, name: "Adventure", icon: Compass, color: "orange" },
  { id: 16, name: "Animation", icon: Sparkles, color: "green" },
  { id: 35, name: "Comedy", icon: Laugh, color: "yellow" },
  { id: 80, name: "Crime", icon: Shield, color: "blue" },
  { id: 99, name: "Documentary", icon: Clapperboard, color: "cyan" },
  { id: 18, name: "Drama", icon: Drama, color: "gray" },
  { id: 10751, name: "Family", icon: Users, color: "green" },
  { id: 14, name: "Fantasy", icon: Sparkles, color: "purple" },
  { id: 36, name: "History", icon: Landmark, color: "orange" },
  { id: 27, name: "Horror", icon: Ghost, color: "dark" },
  { id: 10402, name: "Music", icon: Music, color: "pink" },
  { id: 9648, name: "Mystery", icon: Search, color: "blue" },
  { id: 10749, name: "Romance", icon: Heart, color: "pink" },
  { id: 878, name: "Science Fiction", icon: Orbit, color: "purple" },
  { id: 53, name: "Thriller", icon: Zap, color: "red" },
];

export function Genres() {
  const navigate = useNavigate();

  function openGenre(genre) {
    navigate(`/genre/${genre.id}/${encodeURIComponent(genre.name)}`);
  }

  return (
    <main className="genres-page">
      <section className="genres-header">
        <span className="genres-eyebrow">YOUR NEXT STORY STARTS HERE</span>

        <h1>
          Explore <span>Genres</span>
        </h1>

        <p>
          From heart-pounding action to unforgettable romance, discover movies
          made for your mood.
        </p>
      </section>

      <section className="genres-grid">
        {genres.map((genre) => {
          const Icon = genre.icon;

          return (
            <button
              type="button"
              className={`genre-card ${genre.color}`}
              key={genre.id}
              onClick={() => openGenre(genre)}
            >
              <span className="genre-icon">
                <Icon size={30} strokeWidth={1.8} />
              </span>

              <span className="genre-card-content">
                <span className="genre-name">{genre.name}</span>
                <span className="genre-subtitle">Explore movies</span>
              </span>

              <span className="genre-arrow">↗</span>
            </button>
          );
        })}
      </section>
    </main>
  );
}
