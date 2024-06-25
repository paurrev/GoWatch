import { getGenresMovies, getGenresMoviesFilter, getMoviesNowPlaying, resetScroll } from './main.js';
import {
  buttonsNowPlaying,
  buttonsPopular,
  buttonsTopRated,
  categoriesSection,
  indexSection,
  logoPrincipal,
  nowPlayingSection,
} from './node.js';

// Función genérica para agregar event listeners a los botones
function addEventListenersToButtons(buttons, hashValue) {
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      location.hash = hashValue;
      navigator();
      console.log(e);
    });
  });
}

logoPrincipal.addEventListener('click', () => {
  location.hash = '#home';
  navigator();
});

addEventListenersToButtons(buttonsPopular, '#popular');
addEventListenersToButtons(buttonsNowPlaying, '#now-playing');
addEventListenersToButtons(buttonsTopRated, '#top-rated');

const routes = [
  { name: 'home', hashstart: '#home', render: homePage },
  { name: 'trends', hashstart: '#trends', render: trendsPage },
  { name: 'search', hashstart: '#search=', render: searchPage },
  { name: 'movie', hashstart: '#movie=', render: movieDetailsPage },
  { name: 'category', hashstart: '#category=', render: categoriesPage },
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
  categoriesSection.classList.add('inactive');
  getGenresMovies();
  getMoviesNowPlaying();
  resetScroll();
}

function page404() {
  console.log('404 error');
}

function nowPlayingPage() {
  console.log('Now Playing');
  indexSection.classList.add('inactive');
  nowPlayingSection.classList.remove('inactive');
  categoriesSection.classList.add('inactive');
  getGenresMovies();
  getMoviesNowPlaying();
  resetScroll();
}

function categoriesPage() {
  console.log('categoriesPage');
  indexSection.classList.add('inactive');
  nowPlayingSection.classList.add('inactive');
  categoriesSection.classList.remove('inactive')

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');

  getGenresMoviesFilter(categoryId);
  resetScroll();
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

function favoritesPage() {
  console.log('favoritesPage');
}
