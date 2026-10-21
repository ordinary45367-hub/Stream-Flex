import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { getTVCategory, getTVImage, searchTVShows } from "../services/api";
import { Navbar } from "../components/Navbar";
import "../components/TV.css";

const categories = [
  { key: "popular", title: "Popular TV Shows" },
  { key: "top_rated", title: "Top Rated Series" },
  { key: "on_the_air", title: "Currently On Air" },
  { key: "airing_today", title: "Airing Today" },
];

function TVRow({ title, shows, loading, onSelect }) {
  return (
    <>
      <Navbar />
      <section className="tv-row-section">
        <h2 className="tv-row-title">{title}</h2>

        {loading ? (
          <p className="tv-muted">Loading shows...</p>
        ) : shows.length === 0 ? (
          <p className="tv-muted">No shows available.</p>
        ) : (
          <div className="tv-row">
            {shows.map((show) => (
              <button
                key={show.id}
                className="tv-row-card"
                onClick={() => onSelect(show.id)}
              >
                <div className="tv-row-poster">
                  {show.poster_path ? (
                    <img
                      src={getTVImage(show.poster_path, "w342")}
                      alt={show.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="tv-no-poster">No poster</div>
                  )}

                  <span className="tv-row-rating">
                    ★ {show.vote_average?.toFixed(1) ?? "N/A"}
                  </span>
                </div>

                <h3>{show.name}</h3>
                <p>
                  {show.first_air_date?.slice(0, 4) || "Release date unknown"}
                </p>
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default function TVShows() {
  const navigate = useNavigate();
  const [rows, setRows] = useState({});
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      const responses = await Promise.allSettled(
        categories.map(async (category) => ({
          key: category.key,
          shows: (await getTVCategory(category.key)).results ?? [],
        })),
      );

      if (cancelled) return;

      const nextRows = {};
      responses.forEach((response, index) => {
        nextRows[categories[index].key] =
          response.status === "fulfilled" ? response.value.shows : [];
      });

      setRows(nextRows);
      setLoading(false);
    }

    loadCategories().catch(() => setLoading(false));

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSearch(event) {
    event.preventDefault();

    const term = query.trim();
    if (!term) {
      setSubmitted(false);
      setResults([]);
      setSearchError("");
      return;
    }

    setSubmitted(true);
    setSearching(true);
    setSearchError("");

    try {
      const data = await searchTVShows(term);
      setResults(data.results ?? []);
    } catch (error) {
      console.error(error);
      setSearchError("Search failed. Please try again.");
      setResults([]);
    } finally {
      setSearching(false);
    }
  }

  function clearSearch() {
    setQuery("");
    setResults([]);
    setSubmitted(false);
    setSearchError("");
    searchRef.current?.focus();
  }

  return (
    <main className="tv-page">
      <header className="tv-discover-header">
        <p className="tv-eyebrow">YOUR NEXT BINGE STARTS HERE</p>
        <h1>Discover TV Shows</h1>
        <p>Explore popular stories, all-time favorites, and new episodes.</p>

        <form className="tv-search-form" onSubmit={handleSearch}>
          <span className="tv-search-icon" aria-hidden="true">
            ⌕
          </span>

          <input
            ref={searchRef}
            className="tv-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search TV shows..."
            aria-label="Search TV shows"
          />

          {query && (
            <button
              type="button"
              className="tv-clear-search"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

          <button
            className="tv-search-button"
            type="submit"
            disabled={searching || !query.trim()}
          >
            Search
          </button>
        </form>
      </header>

      {submitted ? (
        <section className="tv-search-results">
          <div className="tv-section-heading">
            <h2>Search results for "{query.trim()}"</h2>
            <button className="tv-back" onClick={clearSearch}>
              Show categories
            </button>
          </div>

          {searching && <p className="tv-muted">Searching TV shows...</p>}

          {searchError && <p role="alert">{searchError}</p>}

          {!searching && !searchError && results.length === 0 && (
            <p className="tv-muted">No TV shows found. Try another title.</p>
          )}

          {!searching && (
            <div className="tv-grid">
              {results.map((show) => (
                <button
                  className="tv-card"
                  key={show.id}
                  onClick={() => navigate(`/tv/${show.id}`)}
                >
                  <div className="tv-poster-wrap">
                    {show.poster_path ? (
                      <img
                        src={getTVImage(show.poster_path, "w342")}
                        alt={show.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="tv-no-poster">No poster</div>
                    )}

                    <span className="tv-rating">
                      ★ {show.vote_average?.toFixed(1) ?? "N/A"}
                    </span>
                  </div>

                  <div className="tv-card-info">
                    <h2>{show.name}</h2>
                    <p>
                      {show.first_air_date?.slice(0, 4) ||
                        "Release date unknown"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      ) : (
        categories.map((category) => (
          <TVRow
            key={category.key}
            title={category.title}
            shows={rows[category.key] ?? []}
            loading={loading}
            onSelect={(id) => navigate(`/tv/${id}`)}
          />
        ))
      )}
    </main>
  );
}

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { getPopularTVShows, getTVImage } from "../services/api";
// import "../components/TV.css";

// export default function TVShows() {
//   const [shows, setShows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function load() {
//       try {
//         const data = await getPopularTVShows();
//         setShows(data.results ?? []);
//       } catch {
//         setError("Unable to load TV shows. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     load();
//   }, []);

//   const filteredShows = shows.filter((show) =>
//     show.name.toLowerCase().includes(query.toLowerCase()),
//   );

//   if (loading)
//     return (
//       <main className="tv-page">
//         <p>Loading series...</p>
//       </main>
//     );
//   if (error)
//     return (
//       <main className="tv-page">
//         <p>{error}</p>
//       </main>
//     );

//   return (
//     <main className="tv-page">
//       <header className="tv-heading">
//         <div>
//           <p className="tv-eyebrow">YOUR NEXT BINGE</p>
//           <h1>TV Series</h1>
//           <p>Discover stories worth staying up for.</p>
//         </div>

//         <input
//           className="tv-search"
//           value={query}
//           onChange={(event) => setQuery(event.target.value)}
//           placeholder="Search these shows..."
//           aria-label="Search TV shows"
//         />
//       </header>

//       <section className="tv-grid">
//         {filteredShows.map((show) => (
//           <button
//             className="tv-card"
//             key={show.id}
//             onClick={() => navigate(`/tv/${show.id}`)}
//           >
//             <div className="tv-poster-wrap">
//               {show.poster_path ? (
//                 <img
//                   src={getTVImage(show.poster_path)}
//                   alt={show.name}
//                   loading="lazy"
//                 />
//               ) : (
//                 <div className="tv-no-poster">No poster</div>
//               )}
//               <span className="tv-rating">
//                 ★ {show.vote_average?.toFixed(1) ?? "N/A"}
//               </span>
//             </div>

//             <div className="tv-card-info">
//               <h2>{show.name}</h2>
//               <p>
//                 {show.first_air_date?.slice(0, 4) || "Release date unknown"}
//               </p>
//             </div>
//           </button>
//         ))}
//       </section>

//       {filteredShows.length === 0 && <p>No matching shows found.</p>}
//     </main>
//   );
// }

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { getTVCategory, getTVImage } from "../services/api";
// import "../components/TV.css";

// const categories = [
//   { key: "popular", title: "Popular TV Shows" },
//   { key: "top_rated", title: "Top Rated Series" },
//   { key: "on_the_air", title: "Currently On Air" },
//   { key: "airing_today", title: "Airing Today" },
// ];

// function TVRow({ title, shows, loading, onSelect }) {
//   return (
//     <section className="tv-row-section">
//       <h2 className="tv-row-title">{title}</h2>

//       {loading ? (
//         <p className="tv-muted">Loading shows...</p>
//       ) : (
//         <div className="tv-row">
//           {shows.map((show) => (
//             <button
//               key={show.id}
//               className="tv-row-card"
//               onClick={() => onSelect(show.id)}
//             >
//               <div className="tv-row-poster">
//                 {show.poster_path ? (
//                   <img
//                     src={getTVImage(show.poster_path, "w342")}
//                     alt={show.name}
//                     loading="lazy"
//                   />
//                 ) : (
//                   <div className="tv-no-poster">No poster</div>
//                 )}

//                 <span className="tv-row-rating">
//                   ★ {show.vote_average?.toFixed(1) ?? "N/A"}
//                 </span>
//               </div>

//               <h3>{show.name}</h3>
//               <p>
//                 {show.first_air_date?.slice(0, 4) || "Release date unknown"}
//               </p>
//             </button>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// export default function TVShows() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let cancelled = false;

//     async function loadCategories() {
//       setLoading(true);
//       setError("");

//       const results = await Promise.allSettled(
//         categories.map(async (category) => ({
//           key: category.key,
//           shows: (await getTVCategory(category.key)).results ?? [],
//         })),
//       );

//       if (cancelled) return;

//       const nextRows = {};
//       let failures = 0;

//       results.forEach((result, index) => {
//         if (result.status === "fulfilled") {
//           nextRows[result.value.key] = result.value.shows;
//         } else {
//           failures += 1;
//           nextRows[categories[index].key] = [];
//           console.error(
//             `Failed to load ${categories[index].title}`,
//             result.reason,
//           );
//         }
//       });

//       setRows(nextRows);
//       setLoading(false);

//       if (failures === categories.length) {
//         setError("Unable to load TV shows. Check your API configuration.");
//       }
//     }

//     loadCategories();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   return (
//     <main className="tv-page">
//       <header className="tv-discover-header">
//         <p className="tv-eyebrow">YOUR NEXT BINGE STARTS HERE</p>
//         <h1>Discover TV Shows</h1>
//         <p>Explore popular stories, all-time favorites, and new episodes.</p>
//       </header>

//       {error && <p role="alert">{error}</p>}

//       {categories.map((category) => (
//         <TVRow
//           key={category.key}
//           title={category.title}
//           shows={rows[category.key] ?? []}
//           loading={loading}
//           onSelect={(id) => navigate(`/tv/${id}`)}
//         />
//       ))}
//     </main>
//   );
// }
