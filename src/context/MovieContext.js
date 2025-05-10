import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [lastsearch, setLastsearch] = useState(null);

  const getStorageKey = (key) => `${isAuthenticated ? 'authenticated' : 'anonymous'}_${key}`;

  useEffect(() => {
    const keyFavorites = getStorageKey('favorites');
    const keyHistory = getStorageKey('history');
    const keyLastSearch = getStorageKey('lastsearch');
    
    setFavorites(JSON.parse(localStorage.getItem(keyFavorites)) || []);
    setSearchHistory(JSON.parse(localStorage.getItem(keyHistory)) || []);
    setLastsearch(JSON.parse(localStorage.getItem(keyLastSearch)) || null);
  }, [isAuthenticated]);

  useEffect(() => {
    const keyFavorites = getStorageKey('favorites');
    localStorage.setItem(keyFavorites, JSON.stringify(favorites));
  }, [favorites, isAuthenticated]);

  useEffect(() => {
    const keyHistory = getStorageKey('history');
    localStorage.setItem(keyHistory, JSON.stringify(searchHistory));
  }, [searchHistory, isAuthenticated]);

  useEffect(() => {
    const keyLastSearch = getStorageKey('lastsearch');
    localStorage.setItem(keyLastSearch, JSON.stringify(lastsearch));
  }, [lastsearch, isAuthenticated]);

  const addFavorite = (movie) => {
    setFavorites(prev => [...prev, movie]);
  };

  const removeFavorite = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  const addToHistory = (search) => {
    setSearchHistory(prev => [search, ...prev.slice(0, 9)]);
  };
  
  return (
    <MovieContext.Provider value={{
      favorites,
      searchHistory,
      lastsearch,
      setLastsearch,
      addFavorite,
      removeFavorite,
      addToHistory
    }}>
      {children}
    </MovieContext.Provider>
  );
}

export const useMovie = () => useContext(MovieContext);