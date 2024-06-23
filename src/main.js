import { TOKEN_AUTH } from './secrets.js';
import { ENDPOINTS_MOVIE } from './endpoints.js';
import { navigator } from './routes.js';
import {
  trendingContainer,
  popularContainer,
  nowPlayingContainer,
  posterContainer,
  test,
  nowPlayingContainerMain,
  
} from './node.js';

function buttonPopularClick() {
  location.hash = '#popular';
}

let isChecked;
let labelMovie;

const imgBaseURL = 'https://image.tmdb.org/t/p/w500/';

export async function getMovies() {
  const response = await fetch(ENDPOINTS_MOVIE.getAllMovies);
  const data = await response.json();

  const dataMovie = data.results;
  // console.log(dataMovie.length);
  if (response.status === 200) {
    // insertPosters(dataMovie);
    // console.log(dataMovie);
  } else {
    console.error(`Hubo un error ${response.status}`);
  }
}

async function getMoviesTrending() {
  const response = await fetch(ENDPOINTS_MOVIE.getAllMoviesTrending);
  const data = await response.json();

  const dataMovie = data.results;
  // console.log(dataMovie.length);
  if (response.status === 200) {
    insertMoviesTrending(dataMovie);
    // console.log(dataMovie);
  } else {
    console.error(`Hubo un error ${response.status}`);
  }
}

function insertMoviesTrending(data) {
  trendingContainer.innerHTML = '';

  data.forEach((movie) => {
    const imgPoster = document.createElement('img');
    imgPoster.classList.add('trending-poster');
    imgPoster.classList.add('trending-poster--main');
    imgPoster.src = imgBaseURL + movie.poster_path;

    trendingContainer.appendChild(imgPoster);
  });
}

async function getMoviesPopular() {
  const response = await fetch(ENDPOINTS_MOVIE.getMoviesPopular);
  const data = await response.json();

  // console.log(data);
  const dataMovie = data.results;
  // console.log(dataMovie.length);
  if (response.status === 200) {
    insertMoviesPopular(dataMovie);
    // console.log(dataMovie);
  } else {
    console.error(`Hubo un error ${response.status}`);
  }
}

function insertMoviesPopular(data) {
  popularContainer.innerHTML = '';

  data.forEach((movie) => {
    const imgPoster = document.createElement('img');
    imgPoster.classList.add('popular-poster');
    imgPoster.classList.add('popular-poster--main');
    imgPoster.src = imgBaseURL + movie.poster_path;

    popularContainer.appendChild(imgPoster);
  });
}

export async function getMoviesNowPlaying() {
  const response = await fetch(ENDPOINTS_MOVIE.getMoviesNowPlaying);
  const data = await response.json();

  const dataMovie = data.results;
  if (response.status === 200) {
    insertMoviesNowPlayingSection(dataMovie)
    insertMoviesNowPlayingMain(dataMovie);
  } else {
    console.error(`Hubo un error ${response.status}`);
  }
}

function insertMoviesNowPlayingMain(data) {
  nowPlayingContainer.innerHTML = '';

  data.forEach((movie) => {
    const imgPoster = document.createElement('img');
    imgPoster.classList.add('now-playing-poster');
    imgPoster.classList.add('now-playing-poster--main');
    imgPoster.src = imgBaseURL + movie.poster_path;
    nowPlayingContainer.appendChild(imgPoster);
  });
}

function insertMoviesNowPlayingSection(data) {
  nowPlayingContainerMain.innerHTML = '';

  data.forEach((movie) => {
    const imgPoster = document.createElement('img');
    const divPoster = document.createElement('div')
    imgPoster.classList.add('now-playing-poster');
    imgPoster.src = imgBaseURL + movie.poster_path;
    divPoster.classList.add('now-playing--container')
    divPoster.appendChild(imgPoster);
    nowPlayingContainerMain.appendChild(divPoster)
  });
}

async function getMoviesFavorites() {
  const response = await fetch(ENDPOINTS_MOVIE.getMoviesFavorites, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TOKEN_AUTH,
    },
  });
  const data = await response.json();
  // console.log('Favorite');
  // console.log(data.results);
}

async function getGenresMovies() {
  const response = await fetch(ENDPOINTS_MOVIE.getGenresMovies, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TOKEN_AUTH,
    },
  });

  const data = await response.json();
}

function changeMoviesFavorites(isChecked, id) {
  if (isChecked) {
    saveMoviesFavorites(id);
  } else {
    removeMoviesFavorites(id);
  }
}

async function saveMoviesFavorites(id) {
  const response = await fetch(ENDPOINTS_MOVIE.addMoviesFavorites, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: TOKEN_AUTH,
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: id,
      favorite: false,
    }),
  });
  // console.log('save');
  // console.log(response);

  const data = await response.json();
}

async function removeMoviesFavorites(id) {
  const response = await fetch(ENDPOINTS_MOVIE.addMoviesFavorites, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: TOKEN_AUTH,
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: id,
      favorite: true,
    }),
  });
  // console.log('save');
  // console.log(response);

  const data = await response.json();
}

window.addEventListener('load', () => {
  navigator();
});

window.addEventListener('hashchange', () => {
  navigator();
});

getMovies();
getMoviesTrending();
getMoviesPopular();
// getMoviesNowPlaying();
// getMoviesFavorites();
// getGenresMovies()
