import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { DetailsPage } from "./pages/DetailsPage";
import { SearchPage } from "./pages/SearchPage";
import { GenersPage } from "./pages/GenersPage";
// import TVShows from "./pages/TVShows";
import TVDetails from "./pages/TVDetails";
import WatchEpisode from "./pages/WatchEpisode";
import { MovieGenrePage } from "./pages/MovieGenrePage";
import { TvShows } from "./pages/MyTv";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:movieId" element={<DetailsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/genres" element={<GenersPage />} />
        <Route path="/genre/:id/:name" element={<MovieGenrePage />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/tv/:id" element={<TVDetails />} />
        <Route
          path="/watch/tv/:id/:season/:episode"
          element={<WatchEpisode />}
        />
      </Routes>
    </>
  );
}

export default App;
