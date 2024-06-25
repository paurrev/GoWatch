import { TOKEN_AUTH } from './secrets.js';
import { ENDPOINTS_MOVIE } from './endpoints.js';
import { navigator } from './routes.js';
import {
  trendingContainer,
  popularContainer,
  nowPlayingContainer,
  posterContainer,
  nowPlayingContainerMain,
  buttonsContainer,
  buttonsContainerMain,
  categoriesContainer,
  buttonsContainerGenres,
} from './node.js';

const imgBaseURL = 'https://image.tmdb.org/t/p/w500/';

export function resetScroll() {
  window.scrollTo(0, 0);
}

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
    // insertMoviesNowPlayingSection(dataMovie)
    // insertMoviesNowPlayingMain(dataMovie);
    insertMoviesBillboard(
      dataMovie,
      nowPlayingContainer,
      'now-playing-poster now-playing-poster--main'
    );
    insertMoviesBillboard(
      dataMovie,
      nowPlayingContainerMain,
      'now-playing-poster',
      'now-playing--container'
    );
  } else {
    console.error(`Hubo un error ${response.status}`);
  }
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
}

export async function getGenresMovies() {
  const response = await fetch(ENDPOINTS_MOVIE.getGenresMovies, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TOKEN_AUTH,
    },
  });

  const data = await response.json();
  const dataGenres = data.genres;
  insertGenres(dataGenres, buttonsContainer);
  insertGenres(dataGenres, buttonsContainerMain);
  insertGenres(dataGenres, buttonsContainerGenres);
}

function insertGenres(genres, buttonContainer) {
  genres.forEach((genre) => {
    
    const genreOption = document.createElement('button');
    const nameGenre = genre.name;
    genreOption.innerText = nameGenre;
    const nameGenreLowercase = nameGenre.toLowerCase().split(' ').join('-');
    genreOption.addEventListener('click', () => {
      location.hash = `category=${genre.id}-${nameGenreLowercase}`
    })

    genreOption.className = `buttons-categories__button buttons-categories__button--${nameGenreLowercase}`;
    buttonContainer.appendChild(genreOption);
    
  });
}

export async function getGenresMoviesFilter(id) {
  const url = ENDPOINTS_MOVIE.getDiscoverMovies(id);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TOKEN_AUTH,
    },
  });

  const data = await response.json();
  const movie = data.results

  insertMoviesBillboard(
    movie,
    categoriesContainer,
    'now-playing-poster',
    'now-playing--container'
  );
}

function insertMoviesBillboard(data, movieContainer, classImg, classId = null) {
  movieContainer.innerHTML = null;

  data.forEach((movie) => {
    const imgPoster = document.createElement('img');
    const imageClasses = classImg.split(' ');
    imageClasses.forEach((clss) => imgPoster.classList.add(clss));
    imgPoster.src = imgBaseURL + movie.poster_path;

    if (classId) {
      const divPoster = document.createElement('div');
      divPoster.classList.add(classId);
      divPoster.appendChild(imgPoster);
      movieContainer.appendChild(divPoster);
    } else {
      movieContainer.appendChild(imgPoster);
    }
  });
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
  buttonsContainerGenres.scrollLeft = 0
});

getMovies();
getMoviesTrending();
getMoviesPopular();
// getMoviesNowPlaying();
// getMoviesFavorites();
