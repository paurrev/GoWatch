import { ENDPOINTS_MOVIE } from './endpoints.js';
import { TOKEN_AUTH } from "./secrets.js";



const posterSection = document.querySelector('.posters-section');
const trendingSection = document.querySelector('.trending-posters_container');
const popularSection = document.querySelector('.popular-posters_container');
const nowPlayingSection = document.querySelector('.now-playing-posters_container');

let isChecked;
let labelMovie;

const imgBaseURL = 'https://image.tmdb.org/t/p/w500/';

async function getMovies() {
  const response = await fetch(ENDPOINTS_MOVIE.getAllMovies);
  const data = await response.json();

  const dataMovie = data.results;
  // console.log(dataMovie.length);
  if (response.status === 200) {
    // insertPosters(dataMovie);
    console.log(dataMovie);
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
    console.log(dataMovie);
  } else {
    console.error(`Hubo un error ${response.status}`);
  }
}

function insertMoviesTrending(data) {
  data.forEach((movie) => {
    const imgPoster = document.createElement('img');
    imgPoster.classList.add('trending-poster');
    imgPoster.src = imgBaseURL + movie.poster_path;

    trendingSection.appendChild(imgPoster);
  });
}

async function getMoviesPopular() {
  const response = await fetch(ENDPOINTS_MOVIE.getMoviesPopular);
  const data = await response.json();

  console.log(data);
  const dataMovie = data.results;
  // console.log(dataMovie.length);
  if (response.status === 200) {
    insertMoviesPopular(dataMovie)
    console.log(dataMovie);
  } else {
    console.error(`Hubo un error ${response.status}`);
  }
}

function insertMoviesPopular(data) {
  data.forEach((movie) => {
    const imgPoster = document.createElement('img');
    imgPoster.classList.add('popular-poster');
    imgPoster.src = imgBaseURL + movie.poster_path;

    popularSection.appendChild(imgPoster);
  });
}

async function getMoviesNowPlaying() {
  const response = await fetch(ENDPOINTS_MOVIE.getMoviesNowPlaying);
  const data = await response.json();

  console.log(data);
  const dataMovie = data.results;
  // console.log(dataMovie.length);
  if (response.status === 200) {
    insertMoviesNowPlaying(dataMovie)
    console.log(dataMovie);
  } else {
    console.error(`Hubo un error ${response.status}`);
  }
}

function insertMoviesNowPlaying(data) {
  data.forEach((movie) => {
    const imgPoster = document.createElement('img');
    imgPoster.classList.add('now-playing-poster');
    imgPoster.src = imgBaseURL + movie.poster_path;

    nowPlayingSection.appendChild(imgPoster);
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

// function insertPosters(data) {
//   data.forEach((movie) => {
//     const articleMovie = document.createElement('article');
//     articleMovie.classList.add('poster-box');

//     const imgMovie = document.createElement('img');
//     imgMovie.src = imgBaseURL + movie.poster_path;
//     imgMovie.classList.add('poster-img');

//     labelMovie = document.createElement('label');
//     labelMovie.className = 'ui-bookmark';

//     const input = document.createElement('input');
//     input.setAttribute('type', 'checkbox');
//     input.className = 'input-heart';
//     input.name = 'favorite';
//     input.id = `input-${movie.id}`;

//     input.addEventListener('change', (e) => {
//       isChecked = e.target.checked;
//       console.log(isChecked);

//       if (isChecked) {
//         isChecked = true;
//         localStorage.setItem(`buttonSelected-${movie.id}`, true);
//         labelMovie.classList.add('checked');
//         console.log('cambio el local');
//       } else {
//         isChecked = false;
//         localStorage.removeItem(`buttonSelected-${movie.id}`);
//       }
//     });

//     if (localStorage.getItem(`buttonSelected-${movie.id}`) === 'true') {
//       input.checked = true;
//       labelMovie.classList.add('checked');
//     }

//     const div = document.createElement('div');
//     div.className = 'bookmark';

//     const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//     svg.setAttribute('viewBox', '0 0 16 16');
//     svg.setAttribute('class', 'svg-heart');
//     svg.setAttribute('height', '25');
//     svg.setAttribute('width', '25');
//     svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

//     const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
//     path.setAttribute(
//       'd',
//       'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314'
//     );
//     path.setAttribute('fill-rule', 'evenodd');

//     svg.appendChild(path);
//     div.appendChild(svg);
//     labelMovie.appendChild(input);
//     labelMovie.appendChild(div);

//     posterSection.appendChild(articleMovie);
//     articleMovie.appendChild(imgMovie);
//     articleMovie.appendChild(labelMovie);

//     const button = document.getElementById(`input-${movie.id}`);
//     button.addEventListener('click', () => changeMoviesFavorites(isChecked, movie.id));

//   });
// }

getMovies();
getMoviesTrending();
getMoviesPopular();
getMoviesNowPlaying()
// getMoviesFavorites();
// getGenresMovies()
