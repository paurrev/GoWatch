import { getMoviesNowPlaying } from './main.js';
import {
  buttonNowPlaying,
  buttonPopular,
  buttonTopRated,
  indexSection,
  logoPrincipal,
  nowPlayingSection,
} from './node.js';

buttonNowPlaying.addEventListener('click', (e) => {
  e.preventDefault();
  location.hash = '#now-playing';
  navigator();
});

buttonTopRated.addEventListener('click', (e) => {
  e.preventDefault();
  location.hash = '#top-rated';
  navigator();
});

logoPrincipal.addEventListener('click', (e) => {
  location.hash = '#home';
  navigator();
});

buttonPopular.addEventListener('click', (e) => {
  e.preventDefault();
  location.hash = '#popular';
  navigator();
});

const routes = [
  { name: 'home', hashstart: '#home', render: homePage },
  { name: 'trends', hashstart: '#trends', render: trendsPage },
  { name: 'search', hashstart: '#search=', render: searchPage },
  { name: 'movie', hashstart: '#movie=', render: movieDetailsPage },
  { name: 'category', hashstart: '#category', render: categoriesPage },
  { name: 'favority', hashstart: '#favority', render: favoritesPage },
  { name: 'now-playing', hashstart: '#now-playing', render: nowPlayingPage },
  { name: 'top-rated', hashstart: '#top-rated', render: topRatedPage },
  { name: 'popular', hashstart: '#popular', render: popularPage },
];

export function navigator() {
  const hash = window.location.hash;
  let rending = hash === '' ? homePage : page404;
  const searchIndexRenderPage = routes.findIndex((route) =>
    hash.startsWith(route.hashstart)
  );
  if (searchIndexRenderPage !== -1) {
    rending = routes[searchIndexRenderPage].render;
  }
  rending();
}

function homePage() {
  console.log('homePage');
  indexSection.classList.remove('inactive');
  nowPlayingSection.classList.add('inactive');
  getMoviesNowPlaying();
}

function page404() {
  console.log('404 error');
}

function nowPlayingPage() {
  console.log('Now Playing');
  indexSection.classList.add('inactive');
  nowPlayingSection.classList.remove('inactive');
  getMoviesNowPlaying();
}

function trendsPage() {}

function popularPage() {
  console.log('PopularPage');
}

function topRatedPage() {
  console.log('Top Rated');
}

function searchPage() {
  console.log('searchPage');
}

function movieDetailsPage() {
  console.log('movieDetailsPage');
}

function categoriesPage() {
  console.log('categoriesPage');
}

function favoritesPage() {
  console.log('favoritesPage');
}
