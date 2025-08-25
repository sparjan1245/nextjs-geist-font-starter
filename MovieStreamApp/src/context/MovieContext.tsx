import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Movie {
  id: number;
  title: string;
  category: string;
  poster: string;
  videoUrl: string;
  description: string;
  cast: string[];
  rating: number;
  releaseDate: string;
}

interface MovieContextType {
  watchlist: Movie[];
  favorites: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  isInFavorites: (movieId: number) => boolean;
  clearWatchlist: () => void;
  clearFavorites: () => void;
  error: string | null;
  clearError: () => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addToWatchlist = (movie: Movie) => {
    try {
      setError(null);
      
      if (!movie || !movie.id) {
        setError('Invalid movie data');
        return;
      }
      
      // Check if movie is already in watchlist
      const isAlreadyInWatchlist = watchlist.some(item => item.id === movie.id);
      
      if (isAlreadyInWatchlist) {
        setError('Movie is already in your watchlist');
        return;
      }
      
      setWatchlist(prev => [...prev, movie]);
    } catch (err) {
      setError('Failed to add movie to watchlist');
    }
  };

  const removeFromWatchlist = (movieId: number) => {
    try {
      setError(null);
      
      if (!movieId) {
        setError('Invalid movie ID');
        return;
      }
      
      setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
    } catch (err) {
      setError('Failed to remove movie from watchlist');
    }
  };

  const addToFavorites = (movie: Movie) => {
    try {
      setError(null);
      
      if (!movie || !movie.id) {
        setError('Invalid movie data');
        return;
      }
      
      // Check if movie is already in favorites
      const isAlreadyInFavorites = favorites.some(item => item.id === movie.id);
      
      if (isAlreadyInFavorites) {
        setError('Movie is already in your favorites');
        return;
      }
      
      setFavorites(prev => [...prev, movie]);
    } catch (err) {
      setError('Failed to add movie to favorites');
    }
  };

  const removeFromFavorites = (movieId: number) => {
    try {
      setError(null);
      
      if (!movieId) {
        setError('Invalid movie ID');
        return;
      }
      
      setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    } catch (err) {
      setError('Failed to remove movie from favorites');
    }
  };

  const isInWatchlist = (movieId: number): boolean => {
    try {
      return watchlist.some(movie => movie.id === movieId);
    } catch (err) {
      return false;
    }
  };

  const isInFavorites = (movieId: number): boolean => {
    try {
      return favorites.some(movie => movie.id === movieId);
    } catch (err) {
      return false;
    }
  };

  const clearWatchlist = () => {
    try {
      setWatchlist([]);
      setError(null);
    } catch (err) {
      setError('Failed to clear watchlist');
    }
  };

  const clearFavorites = () => {
    try {
      setFavorites([]);
      setError(null);
    } catch (err) {
      setError('Failed to clear favorites');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: MovieContextType = {
    watchlist,
    favorites,
    addToWatchlist,
    removeFromWatchlist,
    addToFavorites,
    removeFromFavorites,
    isInWatchlist,
    isInFavorites,
    clearWatchlist,
    clearFavorites,
    error,
    clearError,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context;
};

export type { Movie };
