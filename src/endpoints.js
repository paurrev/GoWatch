import { API_KEY, account_id } from './secrets.js';

export const ENDPOINTS_MOVIE = {
  getAllMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=1&language=es-MX`,
  getMoviesPopular: (page) =>
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=${page}`,
  getAllMoviesTrending: (page) =>
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=es-MX&page=${page}`,
  getMoviesNowPlaying: (page) =>
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-MX&page=${page}`,
  getMoviesTopRated: (page) =>
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=es-MX&page=${page}`,
  getAllMoviesPoster: `https://api.themoviedb.org/3/movie/653346/images&language=es-MX?api_key=${API_KEY}`,
  getMoviesFavorites: `https://api.themoviedb.org/3/account/${account_id}/favorite/movies&language=es-MX?api_key=${API_KEY}&language=es-MX`,
  addMoviesFavorites: `https://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${API_KEY}&language=es-MX`,
  getGenresMovies: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-MX`,
  getDiscoverMovies: (id) =>
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}&language=es-MX`,
  getSearchMovies: (query) =>
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=es-MX`,
  getMoviesById: (id) =>
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-MX`,
  getCrew: (id) =>
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=es-MX`,
  getCertification: (id) =>
    `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`,
  getProviders: (id) =>
    `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
};

export const ENDPOINTS_TV = {
  getAllTVs: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`,
};
