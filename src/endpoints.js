import { API_KEY, account_id } from './secrets.js';

export const ENDPOINTS_MOVIE = {
  getAllMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=1`,
  getMoviesPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
  getAllMoviesTrending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=es-MX`,
  getMoviesNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
  getAllMoviesPoster: `https://api.themoviedb.org/3/movie/653346/images?api_key=${API_KEY}`,
  getMoviesFavorites: `https://api.themoviedb.org/3/account/${account_id}/favorite/movies?api_key=${API_KEY}`,
  addMoviesFavorites: `https://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${API_KEY}`,
  getGenresMovies: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
  getDiscoverMovies: (id) =>
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`,
  getSearchMovies: (query) =>
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`,
  getMoviesById: (id) =>
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}/`,
};

export const ENDPOINTS_TV = {
  getAllTVs: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`,
};
