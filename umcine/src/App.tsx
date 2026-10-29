import Header from './components/header';
import { useState } from 'react';
import MovieGrid from './components/movie-grid';
import { movies as initialMovies } from './data/movies';
import type { Movie } from './types/movie';
import './App.css';

function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <>
      <Header />
      <main className="main">
        <h1>영화 목록</h1>

        <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
      </main>
    </>
  );
}

export default App;
