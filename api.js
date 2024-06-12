const URL = 'https://dragonball-api.com/api/characters';

const API_KEY = '24772db2c713e8eb0493d1b076409d3c';
let TOKEN_AUTH =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDc3MmRiMmM3MTNlOGViMDQ5M2QxYjA3NjQwOWQzYyIsInN1YiI6IjY2NjM5N2ZiNTViY2UxZmFlMGQwMGEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gIVmuRCLPQ-8oBwy4dWeTL4pn26p86goaC0hdJIELgI';
const account_id = '21315389';

const posterSection = document.querySelector('.posters-section');

const ENDPOINTS_MOVIE = {
  getAllMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=1`,
  getMoviesPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
  getAllMoviesPoster: `https://api.themoviedb.org/3/movie/653346/images?api_key=${API_KEY}`,
  getMoviesFavorites: `https://api.themoviedb.org/3/account/${account_id}/favorite/movies?api_key=${API_KEY}`,
  addMoviesFavorites: `https://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${API_KEY}` 
};

const ENDPOINTS_TV = {
  getAllTVs: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`,
};

const imgBaseURL = 'https://image.tmdb.org/t/p/w500/';

async function getMovies() {
  const response = await fetch(ENDPOINTS_MOVIE.getAllMovies);
  const data = await response.json();

  const dataMovie = data.results;
  // console.log(dataMovie.length);
  if (response.status === 200) {
    insertPosters(dataMovie);
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
  console.log('Favorite');
  console.log(data.results);
}

function changeMoviesFavorites(isChecked, id){
  if(isChecked){
    saveMoviesFavorites(id)
  } else{
    removeMoviesFavorites(id)
  }
}

async function saveMoviesFavorites(id){
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
  console.log('save');
  console.log(response);

  const data = await response.json()
}

async function removeMoviesFavorites(id){
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
  console.log('save');
  console.log(response);

  const data = await response.json()
}


//
function insertPosters(data) {
  data.forEach((movie) => {
    const articleMovie = document.createElement('article');
    articleMovie.classList.add('poster-box');

    const imgMovie = document.createElement('img');
    imgMovie.src = imgBaseURL + movie.poster_path;
    imgMovie.classList.add('poster-img');

    const labelMovie = document.createElement('label');
    labelMovie.className = 'ui-bookmark';

    const input = document.createElement('input');
    let isChecked;
    input.setAttribute('type', 'checkbox');
    input.className = 'input-heart';
    input.name = 'favorite';
    input.id = `input-${movie.id}`;
    input.addEventListener('change', (e) => {
      if (e.target.checked) {
        labelMovie.classList.add('checked');
        isChecked = true
      } else {
        labelMovie.classList.remove('checked');
        isChecked = false
      }
    });

    const div = document.createElement('div');
    div.className = 'bookmark';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('class', 'svg-heart');
    svg.setAttribute('height', '25');
    svg.setAttribute('width', '25');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute(
      'd',
      'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314'
    );
    path.setAttribute('fill-rule', 'evenodd');

    svg.appendChild(path);
    div.appendChild(svg);
    labelMovie.appendChild(input);
    labelMovie.appendChild(div);

    posterSection.appendChild(articleMovie);
    articleMovie.appendChild(imgMovie); 
    articleMovie.appendChild(labelMovie);

    const button = document.getElementById(`input-${movie.id}`);
    button.addEventListener('click', () => changeMoviesFavorites(isChecked, movie.id));
  });
}

getMovies();
getMoviesFavorites();
