import {
  getGenresMovies,
  getGenresMoviesFilter,
  getMovieById,
  getMoviesNowPlaying,
  getMoviesPopular,
  getMoviesTopRated,
  getSearchMovies,
  resetScroll
} from './main.js';
import {
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
  closeIcon,
  sectionTopRated,
  navbarMenuVertical,
  navbarGenresID,
  navbarGenresResponID,
  genreContainerRespon,
  navbarMenuList,
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

// Función para remover una clase de una colección de elementos
const removeClassFromNodeList = (nodeList, className) => {
  nodeList.forEach((element) => element.classList.remove(className));
};

// Función para añadir una clase a una colección de elementos
const addClassToNodeList = (nodeList, className) => {
  nodeList.forEach((element) => element.classList.add(className));
};

addEventListenersToButtons(navbarHome, '#home');
addEventListenersToButtons(navbarPopular, '#popular');
addEventListenersToButtons(navbarNowPlaying, '#now-playing');
addEventListenersToButtons(navbarTopRated, '#top-rated');

searchInput.addEventListener('input', (event) => {
  let valueSearch = event.target.value;

  if (valueSearch.length > 0) {
    getSearchMovies(valueSearch);
    searchSectionTitle.classList.remove('inactive');
    searchSectionTrending.classList.add('inactive');
    closeIcon.style.display = 'block';
  } else {
    searchSectionResultsContainer.innerHTML = '';
    searchSectionTitle.classList.add('inactive');
    searchSectionTrending.classList.remove('inactive');
    closeIcon.style.display = 'none';
  }

  //['#search', 'movieId'];
  const [_, movieId] = location.hash.split('=');
});


navbarGenresID.addEventListener('click', () =>{
  genreContainer.classList.toggle('inactive');
})

navbarGenresResponID.addEventListener('click', () => {
  genreContainerRespon.classList.toggle('inactive')
  navbarMenuList.classList.add('inactive')
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
  resetScroll();
  rending();
}

function homePage() {
  console.log('homePage');
  indexSection.classList.remove('inactive');
  sectionNowPlaying.classList.add('inactive');
  categoriesSection.classList.add('inactive');
  sectionPopular.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  sectionTopRated.classList.add('inactive');

  addClassToNodeList(navbarHome, 'navbar-active');
  removeClassFromNodeList(navbarPopular, 'navbar-active');
  removeClassFromNodeList(navbarNowPlaying, 'navbar-active');
  removeClassFromNodeList(navbarTopRated, 'navbar-active');
  removeClassFromNodeList(navbarGenres, 'navbar-active');

  navbarMenuVertical.classList.add('inactive');
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
  sectionTopRated.classList.add('inactive');

  removeClassFromNodeList(navbarHome, 'navbar-active');
  removeClassFromNodeList(navbarPopular, 'navbar-active');
  addClassToNodeList(navbarNowPlaying, 'navbar-active');
  removeClassFromNodeList(navbarTopRated, 'navbar-active');
  removeClassFromNodeList(navbarGenres, 'navbar-active');

  navbarMenuVertical.classList.add('inactive');
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
  sectionTopRated.classList.add('inactive');

  removeClassFromNodeList(navbarHome, 'navbar-active');
  removeClassFromNodeList(navbarPopular, 'navbar-active');
  removeClassFromNodeList(navbarNowPlaying, 'navbar-active');
  removeClassFromNodeList(navbarTopRated, 'navbar-active');
  addClassToNodeList(navbarGenres, 'navbar-active');

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');

  navbarMenuVertical.classList.add('inactive');
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
  sectionTopRated.classList.add('inactive');

  removeClassFromNodeList(navbarHome, 'navbar-active');
  removeClassFromNodeList(navbarPopular, 'navbar-active');
  removeClassFromNodeList(navbarNowPlaying, 'navbar-active');
  removeClassFromNodeList(navbarTopRated, 'navbar-active');
  removeClassFromNodeList(navbarGenres, 'navbar-active');
  resetScroll();

  navbarMenuVertical.classList.add('inactive');
  //['#movie=', '#81381'];
  const [_, movieId] = location.hash.split('=');
  getMovieById(movieId);
  getGenresMovies();
}

function trendsPage() {}

function popularPage() {
  indexSection.classList.add('inactive');
  sectionNowPlaying.classList.add('inactive');
  categoriesSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  sectionPopular.classList.remove('inactive');
  sectionTopRated.classList.add('inactive');

  removeClassFromNodeList(navbarHome, 'navbar-active');
  addClassToNodeList(navbarPopular, 'navbar-active');
  removeClassFromNodeList(navbarNowPlaying, 'navbar-active');
  removeClassFromNodeList(navbarTopRated, 'navbar-active');
  removeClassFromNodeList(navbarGenres, 'navbar-active');

  navbarMenuVertical.classList.add('inactive');
  resetScroll();
  getMoviesPopular();
  getGenresMovies();
}

function topRatedPage() {
  console.log('TopRatedPage');
  sectionTopRated.classList.remove('inactive');
  indexSection.classList.add('inactive');
  sectionNowPlaying.classList.add('inactive');
  categoriesSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  sectionPopular.classList.add('inactive');

  removeClassFromNodeList(navbarHome, 'navbar-active');
  removeClassFromNodeList(navbarPopular, 'navbar-active');
  removeClassFromNodeList(navbarNowPlaying, 'navbar-active');
  addClassToNodeList(navbarTopRated, 'navbar-active');
  removeClassFromNodeList(navbarGenres, 'navbar-active');

  navbarMenuVertical.classList.add('inactive');
  resetScroll();
  getMoviesTopRated();
  getGenresMovies();
}

function searchPage() {
  console.log('searchPage');
}

function favoritesPage() {
  console.log('favoritesPage');
}
