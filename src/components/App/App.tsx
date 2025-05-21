import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import Modal from "../Common/Modal";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  //STATES
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  //SEARCHING AND RENDERING MOVIES BY QUERY
  async function handleSearch(query: string) {
    try {
      const data = await fetchMovies(query);
      setMovies(data);
    } catch {
      console.log("error");
    }
  }

  //MOVIECARD MODAL WINDOW OPTIONS
  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <MovieGrid
        movies={movies}
        onSelect={(movie) => {
          setSelectedMovie(movie);
          openModal();
        }}
      />
      {isModalOpen && selectedMovie && (
        <Modal
          onClose={() => {
            closeModal();
            setSelectedMovie(null);
          }}
        >
          <MovieModal movie={selectedMovie} />
        </Modal>
      )}
    </>
  );
}
