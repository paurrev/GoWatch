import { TOKEN_AUTH } from './secrets.js';
import { ENDPOINTS_MOVIE } from './endpoints.js';
import { navigator } from './routes.js';
import {
  trendingContainer,
  popularContainer,
  nowPlayingContainer,
  nowPlayingContainerMain,
  buttonsContainer,
  buttonsContainerMain,
  categoriesContainer,
  buttonsContainerGenres,
  searchIcon,
  searchInputMain,
  searchInputResults,
  closeIcon,
  searchInput,
  backdropMovie,
  titleMovieName,
  titleMovieYear,
  synopsisText,
  movieDetailSection,
  searchSectionResults,
  navbarInputSection,
  searchSectionTitle,
  searchSectionResultsContainer,
  navbarInputSectionContainer,
  popularContainerMain,
  searchTrendingMovies,
  searchSectionTrending,
  genreContainerMain,
  genreContainer,
  navbarGenres,
  topRatedContainerMain,
  menuIcon,
  navbarMenuVertical,
  genreContainerMainRespon,
} from './node.js';
import { lazyLoadBillboard, LazyLoadHome } from './intersectionObserver.js';

export let page = 1;

const imgBaseURL = 'https://image.tmdb.org/t/p/w500/';
const imgBaseURLBig = 'https://image.tmdb.org/t/p/w1280';
const imgBaseURLSmall = 'https://image.tmdb.org/t/p/w300';

export function resetScroll() {
  window.scrollTo(0, 0);
}

function buttonSearchActive(searchIcon, searchInputSec) {
  searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    searchInputSec.classList.toggle('inactive');
  });
}

buttonSearchActive(searchIcon, searchInputMain);
buttonSearchActive(searchInput, searchSectionResults);

searchInput.addEventListener('click', (e) => {
  e.preventDefault();
  searchSectionResults.classList.remove('inactive');
});

export async function getMovies() {
  const response = await fetch(ENDPOINTS_MOVIE.getAllMovies);
  const data = await response.json();

  const dataMovie = data.results;
  if (response.status === 200) {
  } else {
    console.error(`Hubo un error ${response.status}`);
  }
}

async function getMoviesTrending() {
  const response = await fetch(ENDPOINTS_MOVIE.getAllMoviesTrending(page));
  const data = await response.json();

  const dataMovie = data.results;
  //
  if (response.status === 200) {
    insertMoviesBillboard(
      dataMovie,
      trendingContainer,
      'trending-poster trending-poster--main'
    );
    insertMoviesTrending(dataMovie, searchTrendingMovies);
  } else {
    console.error(`Hubo un error ${response.status}`);
  }
}

export async function getMoviesPopular() {
  const response = await fetch(ENDPOINTS_MOVIE.getMoviesPopular(page));
  const data = await response.json();

  const dataMovie = data.results;
  // console.log(data.total_pages)

  if (response.status === 200) {
    insertMoviesBillboard(
      dataMovie,
      popularContainer,
      'popular-poster popular-poster--main billboard-poster--index'
    );
    insertMoviesBillboard(
      dataMovie,
      popularContainerMain,
      'popular-poster billboard-container--poster',
      'popular--container billboard-poster'
    );
  } else {
    console.error(`Hubo un error ${response.status}`);
  }
}

export async function getMoviesNowPlaying() {
  const response = await fetch(ENDPOINTS_MOVIE.getMoviesNowPlaying(page));
  const data = await response.json();

  const dataMovie = data.results;
  if (response.status === 200) {
    insertMoviesBillboard(
      dataMovie,
      nowPlayingContainer,
      'now-playing-poster now-playing-poster--main billboard-poster--index'
    );
    insertMoviesBillboard(
      dataMovie,
      nowPlayingContainerMain,
      'now-playing-poster billboard-container--poster',
      'now-playing--container billboard-poster'
    );
  } else {
    console.error(`Hubo un error ${response.status}`);
  }
}

export async function getMoviesTopRated() {
  const response = await fetch(ENDPOINTS_MOVIE.getMoviesTopRated(page));
  const data = await response.json();

  const dataMovie = data.results;
  if (response.status === 200) {
    insertMoviesBillboard(
      dataMovie,
      topRatedContainerMain,
      'top-rated-poster billboard-container--poster',
      'top-rated--container billboard-poster'
    );
  } else {
    console.error(`Hubo un error ${response.status}`);
  }
}

export async function getSearchMovies(query) {
  const url = ENDPOINTS_MOVIE.getSearchMovies(query);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TOKEN_AUTH,
    },
  });

  const data = await response.json();
  const movies = data.results;
  insertSearchMovies(movies, searchSectionResultsContainer);
}

let isLoading = false;

export async function getPaginatedMovies(
  url,
  nameContainer,
  classImg,
  classId,
) {

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollBottom = scrollTop + clientHeight >= scrollHeight - 100;

  // console.log(scrollBottom);
  if (scrollBottom && !isLoading) {
    isLoading = true; // Activa el flag
    page++; // Incrementa la página antes de hacer la petición\
    const response = await fetch(url(page));
    const data = await response.json();

    if (response.status === 200) {
      const dataMovie = data.results;
      insertMoviesBillboard(dataMovie, nameContainer, classImg, classId, false);
      isLoading = false; // reset the flag
    } else {
      console.error(`Hubo un error ${response.status}`);
    }
  }
}

function insertSearchMovies(movies, searchResults) {
  searchResults.innerHTML = '';
  searchSectionTitle.innerText = 'Movies';

  movies.slice(0, 4).forEach((movie) => {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'section-input--movie';
    movieDiv.addEventListener('click', () => {
      location.hash = `movie=${movie.id}`;
    });
    const movieImg = document.createElement('img');
    movieImg.className = 'section-input--movie-img';
    movieImg.src = `${imgBaseURLSmall}${movie.poster_path}`;
    const movieSpan = document.createElement('span');
    movieSpan.className = 'section-input--movie--span';
    movieSpan.innerText = movie.title;
    movieDiv.appendChild(movieImg);
    movieDiv.appendChild(movieSpan);
    searchResults.appendChild(movieDiv);
  });
}

menuIcon.addEventListener('click', (event) => {
  event.preventDefault();
  navbarMenuVertical.classList.toggle('inactive');
});

closeIcon.addEventListener('click', (event) => {
  event.preventDefault();
  searchSectionTrending.classList.remove('inactive');
  searchSectionResultsContainer.innerHTML = null;
  searchSectionTitle.innerHTML = null;
  searchInput.value = '';
  searchInputResults.innerHTML = null;
});

document.addEventListener('click', (event) => {
  if (!navbarInputSection.contains(event.target)) {
    searchSectionResults.classList.add('inactive');
    navbarInputSectionContainer.style.borderRadius = '10px';
    closeIcon.style.display = 'none';
  } else {
    navbarInputSectionContainer.style.borderRadius = '10px 10px 0px 0px';
  }

  if (
    !genreContainer.contains(event.target) &&
    ![...navbarGenres].some((genre) => genre.contains(event.target))
  ) {
    genreContainer.classList.add('inactive');
  }

  if (
    !navbarMenuVertical.contains(event.target) &&
    !menuIcon.contains(event.target)
  ) {
    navbarMenuVertical.classList.add('inactive');
  }
});

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
  insertGenres(
    dataGenres,
    genreContainerMain,
    'genre-label',
    'genre-radio',
    'genre--radio-design',
    'genre--label-text'
  );
  insertGenres(
    dataGenres,
    genreContainerMainRespon,
    'genre-label',
    'genre-radio',
    'genre--radio-design-respon',
    'genre--label-text--respon'
  );
}

function insertGenres(
  genres,
  buttonContainer,
  classLabel,
  classRadio,
  classRadioDesign,
  classLabelText
) {
  buttonContainer.innerHTML = '';

  const currentCategory = location.hash.split('category=')[1]?.split('-')[0];

  genres.forEach((genre) => {
    const nameGenre = genre.name;
    const labelGenre = document.createElement('label');
    labelGenre.className = classLabel;
    const inputGenre = document.createElement('input');
    inputGenre.className = classRadio;
    inputGenre.type = 'radio';
    inputGenre.name = 'value-radio';
    inputGenre.value = genre.id;

    // Marcar el radio button si coincide con el género en el hash
    if (genre.id == currentCategory) {
      inputGenre.checked = true;
      navbarGenres.forEach((genres) => {
        genres.checked = true;
        genres.innerHTML = `Genre - ${nameGenre}`;
      });
    }

    const divGenreRadioDesign = document.createElement('div');
    divGenreRadioDesign.className = classRadioDesign;
    const divGenreLabelText = document.createElement('div');
    divGenreLabelText.className = classLabelText;
    divGenreLabelText.innerText = nameGenre;

    labelGenre.appendChild(inputGenre);
    labelGenre.appendChild(divGenreRadioDesign);
    labelGenre.appendChild(divGenreLabelText);
    buttonContainer.appendChild(labelGenre);

    const nameGenreLowercase = nameGenre.toLowerCase().split(' ').join('-');
    labelGenre.addEventListener('click', (event) => {
      location.hash = `category=${genre.id}-${nameGenreLowercase}`;
      inputGenre.checked = true;
    });
  });
}

// export function updateGenreSelection() {
//   const currentCategory = location.hash.split('category=')[1]?.split('-')[0];
//   if (currentCategory) {
//     navbarGenres.forEach((radio) => {
//       if (radio.value == currentCategory) {
//         radio.checked = true;
//       }
//     });
//   }
// }

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
  const movie = data.results;

  insertMoviesBillboard(
    movie,
    categoriesContainer,
    'now-playing-poster billboard-container--poster',
    'now-playing--container billboard-poster'
  );
}

function buttonsArrows(buttonContainer) {
  const svgArrowLeft = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <path fill="currentColor"
        d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z" />
    </svg>
  `;
  const svgArrowRight = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <path fill="currentColor"
        d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z" />
    </svg>
  `;

  const buttonLeft = document.createElement('button');
  buttonLeft.className = 'button-left buttons-arrow';
  buttonLeft.style.display = 'none';
  const buttonRight = document.createElement('button');
  buttonRight.className = 'button-right buttons-arrow';

  buttonLeft.addEventListener('click', () => {
    const scrollStep = buttonContainer.offsetWidth / 2;
    buttonContainer.scrollLeft -= scrollStep;
  });
  buttonRight.addEventListener('click', () => {
    const scrollStep = buttonContainer.offsetWidth / 2;
    buttonContainer.scrollLeft += scrollStep;
  });

  buttonContainer.addEventListener('scroll', () => {
    const scrollLeft = buttonContainer.scrollLeft;
    const clientWidth = buttonContainer.clientWidth;
    const scrollWidth = buttonContainer.scrollWidth;

    // Actualiza la posición de los botones en función del scroll
    buttonLeft.style.left = `${scrollLeft}px`;
    buttonRight.style.right = `-${scrollLeft}px`;

    buttonLeft.style.display = scrollLeft <= 0 ? 'none' : 'block';
    buttonRight.style.display =
      scrollLeft + clientWidth >= scrollWidth ? 'none' : 'block';
  });

  buttonLeft.insertAdjacentHTML('afterbegin', svgArrowLeft);
  buttonRight.insertAdjacentHTML('afterbegin', svgArrowRight);

  buttonContainer.appendChild(buttonLeft);
  buttonContainer.appendChild(buttonRight);
}

('');

function insertMoviesBillboard(
  data,
  movieContainer,
  classImg,
  classId = null,
  clean = true
) {
  if (clean) {
    movieContainer.innerHTML = null;
  }

  if (!classId) {
    buttonsArrows(movieContainer);
  }

  data.forEach((movie) => {
    const imgPoster = document.createElement('img');
    imgPoster.addEventListener('click', () => {
      location.hash = `movie=${movie.id}`;
    });
    imgPoster.className = classImg;
    imgPoster.setAttribute('alt', movie.title);
    imgPoster.setAttribute('data-img', imgBaseURL + movie.poster_path);
    imgPoster.onerror = () => {
      imgPoster.src = '../images/default-img.webp'; // ruta a la imagen por defecto
    };
    imgPoster.onload = () => {
      imgPoster.onerror = null;
    };

    if (classId) {
      const divPoster = document.createElement('div');
      divPoster.className = classId;
      divPoster.appendChild(imgPoster);
      movieContainer.appendChild(divPoster);
      lazyLoadBillboard.observe(imgPoster);
    } else {
      movieContainer.appendChild(imgPoster);
    }

    LazyLoadHome.observe(imgPoster);
  });
}

function insertMoviesTrending(dataMovie, trendingSection) {
  const searchIcon = `
    <svg class="trending-icons trending-icon--input" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
      viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
        d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6" />
    </svg>
  `;

  dataMovie.slice(0, 10).forEach((movie) => {
    const trendingA = document.createElement('a');
    trendingA.addEventListener('click', () => {
      location.hash = `movie=${movie.id}`;
    });
    trendingA.className = 'trending--a';
    trendingA.setAttribute('title', movie.title);

    const trendingSpan = document.createElement('span');
    trendingSpan.className = 'trending--span';
    trendingSpan.innerHTML = movie.title;
    trendingA.insertAdjacentHTML('beforeend', searchIcon);
    trendingA.appendChild(trendingSpan);
    trendingSection.appendChild(trendingA);
  });
}

export async function getMovieById(id) {
  const url = ENDPOINTS_MOVIE.getMoviesById(id);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TOKEN_AUTH,
    },
  });

  const data = await response.json();
  backdropMovie.innerHTML = '';
  insertGetMoviesById(data);
}

function insertGetMoviesById(movie) {
  console.log(movie)
  const divBackdrop = document.createElement('div');
  divBackdrop.classList.add('backdrop-div');
  
  const imgBackdrop = document.createElement('img');
  
  imgBackdrop.src = `${imgBaseURLBig}${movie.backdrop_path}`;
  imgBackdrop.className = 'backdrop-img';
  imgBackdrop.alt = `Backdrop of ${movie.title}`;
  divBackdrop.appendChild(imgBackdrop);
  backdropMovie.appendChild(divBackdrop);
  
  const releaseDate = movie.release_date;
  const year = releaseDate.split('-')[0];
  titleMovieName.innerText = movie.title;
  titleMovieYear.innerText = `(${year})`;
  synopsisText.innerText = movie.overview;
  
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
  //
  //

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

  const data = await response.json();
}

window.addEventListener('DOMContentLoaded', () => {
  navigator();
  resetScroll();
});

window.addEventListener('hashchange', () => {
  navigator();
  if (!location.hash.startsWith('#category=')) {
    navbarGenres.forEach((genre) => {
      genre.innerHTML = 'Genres';
    });
  }
});

getMovies();
getMoviesTrending();
getMoviesPopular(1);
