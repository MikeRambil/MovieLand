import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';

import MovieCard from './MovieCard';
//Api Key -91c0edbe
//OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=91c0edbe

const API_URL = 'https://www.omdbapi.com/?apikey=91c0edbe';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies('spiderman');
  }, []);

  return (
    <div className='app'>
      <h1>MovieLand</h1>
      <div className='search'>
        <input
          placeholder='Search for Movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(event) =>
            event.key === 'Enter' && searchMovies(searchTerm)
          }
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2> No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
