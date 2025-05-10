import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmMzY2Q1ZTlkYzJlNzBjMzY2ZTZjYjVhYjA2ZWJhZSIsIm5iZiI6MTc0MTY3MTQ2Ny41MzcsInN1YiI6IjY3Y2ZjYzJiMjdjMzk2MGMyZDFkZDlkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xrLcazvn-RcTgzL72-UJE6VCLBE69H5A6uZ7Lwpgl5I';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
});

export const getTrendingMovies = async () => {
  try {
    const response = await tmdbApi.get('/trending/movie/day?language=en-US');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await tmdbApi.get('/movie/popular?language=en-US&page=1');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};


export const getAllMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        language: 'en-US',
        sort_by: 'popularity.desc', 
        page: page, // Fetch a specific page (default: 1)
      },
    });
    return response.data.results;

  } catch (error) {
    console.error('Error fetching all movies:', error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: { language: 'en-US' }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
        language: 'en-US'
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};


export const getMovieCredits = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/credits`, {
      params: { language: 'en-US' }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    return { cast: [], crew: [] };
  }
};

