import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";

import { useState } from "react";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  async function handleSearch(query: string) {
    try {
      const data = await fetchMovies(query);
      setMovies(data);
    } catch {
      console.log("error");
    }
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <MovieGrid movies={movies} onSelect={(movie) => console.log(movie)} />
    </>
  );
}
