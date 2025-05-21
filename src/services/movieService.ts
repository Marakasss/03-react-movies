import axios from "axios";
import type { Movie } from "../types/movie";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
interface MoviesResponce {
  results: Movie[];
}
export default async function fetchMovies(query: string) {
  const response = await axios.get<MoviesResponce>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        language: "uk-UA",
      },
      headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
    }
  );
  return response.data.results;
}
