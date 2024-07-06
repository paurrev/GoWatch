import {
  getGenresMovies,
  getGenresMoviesFilter,
  getMovieById,
  getMoviesNowPlaying,
  getMoviesPopular,
  getSearchMovies,
  resetScroll,
} from './main.js';
import {
  buttonsHome,
  buttonsNowPlaying,
  buttonsPopular,
  buttonsTopRated,
  categoriesSection,
  indexSection,
  logoPrincipal,
  movieDetailSection,
  navbarInputSectionContainer,
  sectionNowPlaying,
  popularContainer,
  searchInput,
  searchSectionResults,
  searchSectionResultsContainer,
  searchSectionTitle,
  sectionPopular,
  searchSectionTrending,
  navbarPopular,
  navbarHome,
  navbarNowPlaying,
  navbarTopRated,
  navbarGenres,
  genreContainer,
} from './node.js';

// Función genérica para agregar event listeners a los botones
function addEventListenersToButtons(buttons, hashValue) {
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      location.hash = hashValue;
      navigator();
      resetScroll();
    });
  });
}

logoPrincipal.addEventListener('click', () => {
  location.hash = '#home';
  navigator();
  resetScroll();
});

addEventListenersToButtons(buttonsHome, '#home');
addEventListenersToButtons(buttonsPopular, '#popular');
addEventListenersToButtons(buttonsNowPlaying, '#now-playing');
addEventListenersToButtons(buttonsTopRated, '#top-rated');

searchInput.addEventListener('input', (event) => {
  let valueSearch = event.target.value;

  if (valueSearch.length > 0) {
    getSearchMovies(valueSearch);
    searchSectionTitle.classList.remove('inactive');
    searchSectionTrending.classList.add('inactive')
  } else {
    searchSectionResultsContainer.innerHTML = '';
    searchSectionTitle.classList.add('inactive');
    searchSectionTrending.classList.remove('inactive')
  }

  //['#search', 'movieId'];
  const [_, movieId] = location.hash.split('=');
});

navbarGenres.addEventListener('click', () => {
  genreContainer.classList.toggle('inactive')
})

const routes = [
  { name: 'home', hashstart: '#home', render: homePage },
  { name: 'trends', hashstart: '#trends', render: trendsPage },
  { name: 'search', hashstart: '#search=', render: searchPage },
  { name: 'movie', hashstart: '#movie=', render: movieDetailsPage },
  { name: 'category', hashstart: '#category=', render: categoriesPage },
  { name: 'favorite', hashstart: '#favorite', render: favoritesPage },
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
  resetScroll()
  rending();
  
}

function homePage() {
  console.log('homePage');
  indexSection.classList.remove('inactive');
  sectionNowPlaying.classList.add('inactive');
  categoriesSection.classList.add('inactive');
  sectionPopular.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  navbarHome.classList.add('navbar-active');
  navbarPopular.classList.remove('navbar-active');
  navbarNowPlaying.classList.remove('navbar-active');
  navbarTopRated.classList.remove('navbar-active');
  navbarGenres.classList.remove('navbar-active');
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
  sectionNowPlaying.classList.add('inactive');
  categoriesSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  sectionPopular.classList.add('inactive');
  sectionNowPlaying.classList.remove('inactive');

  navbarHome.classList.remove('navbar-active');
  navbarPopular.classList.remove('navbar-active');
  navbarNowPlaying.classList.add('navbar-active');
  navbarTopRated.classList.remove('navbar-active');
  navbarGenres.classList.remove('navbar-active');
  getGenresMovies();
  getMoviesNowPlaying();
  resetScroll();
}

function categoriesPage() {
  console.log('categoriesPage');
  indexSection.classList.add('inactive');
  sectionNowPlaying.classList.add('inactive');
  sectionPopular.classList.add('inactive');
  categoriesSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  navbarHome.classList.remove('navbar-active');
  navbarPopular.classList.remove('navbar-active');
  navbarNowPlaying.classList.remove('navbar-active');
  navbarTopRated.classList.remove('navbar-active');
  navbarGenres.classList.remove('navbar-active');

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');

  resetScroll();
  getGenresMoviesFilter(categoryId);
  getGenresMovies();
}

function movieDetailsPage() {
  indexSection.classList.add('inactive');
  sectionNowPlaying.classList.add('inactive');
  categoriesSection.classList.add('inactive');
  searchSectionResults.classList.add('inactive');
  navbarInputSectionContainer.style.borderRadius = '10px';
  movieDetailSection.classList.remove('inactive');
  
  navbarHome.classList.remove('navbar-active');
  navbarPopular.classList.remove('navbar-active');
  navbarNowPlaying.classList.remove('navbar-active');
  navbarTopRated.classList.remove('navbar-active');
  navbarGenres.classList.remove('navbar-active');
  resetScroll()
  //['#movie=', '#81381'];
  const [_, movieId] = location.hash.split('=');
  getMovieById(movieId);
  getGenresMovies()
}

function trendsPage() {}

function popularPage() {
  console.log('PopularPage');
  indexSection.classList.add('inactive');
  sectionNowPlaying.classList.add('inactive');
  categoriesSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  sectionPopular.classList.remove('inactive');
  navbarHome.classList.remove('navbar-active');
  navbarPopular.classList.add('navbar-active');
  navbarNowPlaying.classList.remove('navbar-active');
  navbarTopRated.classList.remove('navbar-active');
  navbarGenres.classList.remove('navbar-active');

  resetScroll()
  getMoviesPopular()
  getGenresMovies()
}

function topRatedPage() {
  console.log('Top Rated');
}

function searchPage() {
  console.log('searchPage');
}

function favoritesPage() {
  console.log('favoritesPage');
}
