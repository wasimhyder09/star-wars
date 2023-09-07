import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Movie from './components/Movie';
import MovieList from './components/MoviesList';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHanlder = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl
        };
      });
      setMovies(transformedMovies);
    }
    catch (error) {
      setError(error.message)
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHanlder();
  }, [fetchMoviesHanlder]);

  let content = <p>No movies found!</p>
  if (movies.length > 0) {
    content = <MovieList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading ...</p>
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHanlder}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
