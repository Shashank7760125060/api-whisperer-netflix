const API_KEY = "6a2ae0da6fa1160a1bb5ea454efd21e8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
  genre_ids: number[];
}

export interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

export const getImageUrl = (path: string | null, size: string = "w500") => {
  if (!path) return "/placeholder.svg";
  return `${IMAGE_BASE}/${size}${path}`;
};

const fetchTMDB = async (endpoint: string): Promise<MovieResponse> => {
  const res = await fetch(`${BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch from TMDB");
  return res.json();
};

export const getTrending = () => fetchTMDB("/trending/all/week");
export const getPopularMovies = () => fetchTMDB("/movie/popular");
export const getTopRated = () => fetchTMDB("/movie/top_rated");
export const getNowPlaying = () => fetchTMDB("/movie/now_playing");
export const getUpcoming = () => fetchTMDB("/movie/upcoming");
export const getPopularTV = () => fetchTMDB("/tv/popular");
