import axios from "axios";
const base_URI = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

export async function loadMovies(gener) {
  try {
    const response = await axios.get(
      `${base_URI}/movie/${gener}?api_key=${API_KEY}`,
    );

    return response.data.results;
  } catch (error) {
    console.error("Error loading movies:", error);
    throw error;
  }
}

export async function movieDetails(id) {
  try {
    const response = await axios.get(`${base_URI}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "credits,recommendations,videos",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    throw error;
  }
}

export async function searchMovie(title) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`,
      {
        params: { query: title },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error searching for movie "${title}":`, error);
    throw error;
  }
}

export async function getMovieGenres() {
  try {
    const response = await axios.get(`${base_URI}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    throw error;
  }
}

getMovieGenres();

export async function getMoviesByGenre(genreId, page) {
  try {
    const response = await axios.get(`${base_URI}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        sort_by: "popularity.desc",
        page: page,
      },
    });
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching movies by genre ID ${genreId}:`, error);
    throw error;
  }
}

// ***********************************************************************//
//              AFTER MY API
// ************************************************************************//
export async function loadTVShows(category = "popular") {
  try {
    const response = await axios.get(`${base_URI}/tv/${category}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error(`Error loading TV shows for category "${category}":`, error);
    throw error;
  }
}

export async function getTVShowWithAllEpisodes(seriesId = "1396") {
  try {
    // 1. Get show details and its season list
    const response = await axios.get(`${base_URI}/tv/${seriesId}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    const show = response.data;

    // 2. Request every season at the same time
    const seasons = await Promise.all(
      show.seasons.map(async (season) => {
        const seasonResponse = await axios.get(
          `${base_URI}/tv/${seriesId}/season/${season.season_number}`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
            },
          },
        );

        return seasonResponse.data;
      }),
    );

    console.log({
      ...show,
      seasons,
    });

    // 3. Return show details and every season with its episodes
    return {
      ...show,
      seasons,
    };
  } catch (error) {
    console.error(
      `Error fetching TV show with all episodes (ID: ${seriesId}):`,
      error,
    );
    throw error;
  }
}

async function tmdbGet(path, params = {}) {
  try {
    const response = await axios.get(`${base_URI}${path}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        ...params,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error with TMDB GET request for path "${path}":`, error);
    throw error;
  }
}

export function getPopularTVShows(page = 1) {
  return tmdbGet("/tv/popular", { page });
}

export function getTVDetails(id) {
  return tmdbGet(`/tv/${id}`);
}

export async function getTVShowWithEpisodes(id) {
  try {
    const show = await getTVDetails(id);

    const seasons = await Promise.all(
      (show.seasons ?? []).map((season) =>
        tmdbGet(`/tv/${id}/season/${season.season_number}`),
      ),
    );

    return { ...show, seasons };
  } catch (error) {
    console.error(`Error fetching TV show with episodes (ID: ${id}):`, error);
    throw error;
  }
}

export function getTVImage(path, size = "w500") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "";
}

export function getTVCategory(category, page = 1) {
  const allowedCategories = [
    "popular",
    "top_rated",
    "airing_today",
    "on_the_air",
  ];

  if (!allowedCategories.includes(category)) {
    throw new Error("Invalid TV category");
  }

  return tmdbGet(`/tv/${category}`, { page });
}

export function searchTVShows(query, page = 1) {
  return tmdbGet("/search/tv", {
    query,
    page,
    include_adult: false,
  });
}
