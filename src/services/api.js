import axios from "axios";
const base_URI = "https://api.themoviedb.org/3";
const API_KEY = "8c26f75eb532cf1c9ef8cee2e6c9a0a8";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";
export async function loadMovies(gener) {
  const response = await axios.get(
    `${base_URI}/movie/${gener}?api_key=${API_KEY}`,
  );
  const data = response.data.results;
  //   console.log(IMAGE_BASE_URL + data[9].backdrop_path);
  //   console.log(data);
  return data;
}
export async function movieDetails(id) {
  const response = await axios.get(`${base_URI}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      append_to_response: "credits,recommendations,videos",
    },
  });
  const data = response.data;
  return data;
}
export async function searchMovie(title) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`,
    {
      params: { query: title },
    },
  );
  const data = response.data;
  console.log(data);

  return data;
}

export async function getMovieGenres() {
  const response = await axios.get(`${base_URI}/genre/movie/list`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
    },
  });
  // console.log(response.data.genres);

  return response.data.genres;
}

getMovieGenres();

export async function getMoviesByGenre(genreId, page) {
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
}

// ***********************************************************************//
//              AFTER MY API
// ************************************************************************//
export async function loadTVShows(category = "popular") {
  const response = await axios.get(`${base_URI}/tv/${category}`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      page: 1,
    },
  });
  console.log(response.data.results);

  return response.data.results;
}

export async function getTVShowWithAllEpisodes(seriesId = "1396") {
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
}

async function tmdbGet(path, params = {}) {
  const response = await axios.get(`${base_URI}${path}`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      ...params,
    },
  });

  return response.data;
}

export function getPopularTVShows(page = 1) {
  return tmdbGet("/tv/popular", { page });
}

export function getTVDetails(id) {
  return tmdbGet(`/tv/${id}`);
}

export async function getTVShowWithEpisodes(id) {
  const show = await getTVDetails(id);

  const seasons = await Promise.all(
    (show.seasons ?? []).map((season) =>
      tmdbGet(`/tv/${id}/season/${season.season_number}`),
    ),
  );

  return { ...show, seasons };
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
