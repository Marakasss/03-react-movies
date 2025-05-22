import axios from "axios";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MovieBackdrop {
  backdrop_path: string | null;
}

interface TMDBResponse {
  results: MovieBackdrop[];
}

const randomPage = Math.floor(Math.random() * 1000) + 1;

export async function getRandomBackdropUrl() {
  const { data } = await axios.get<TMDBResponse>(
    "https://api.themoviedb.org/3/movie/popular",
    {
      params: {
        sort_by: "vote_average.desc",
        "vote_count.gte": 20000,
        include_adult: false,
        page: randomPage,
      },
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  );

  const movies = data.results.filter((movie) => movie.backdrop_path);
  if (movies.length === 0) return null;

  const randomMovie = movies[Math.floor(Math.random() * movies.length)];
  return `https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`;
}
