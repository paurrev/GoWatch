const URL = 'https://dragonball-api.com/api/characters';

const API_KEY = '24772db2c713e8eb0493d1b076409d3c';

const posterSection = document.querySelector('.posters-section');

const ENDPOINTS_MOVIE = {
  getAllMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=1`,
  getMoviesPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
  getAllMoviesPoster: `https://api.themoviedb.org/3/movie/653346/images?api_key=${API_KEY}`,
};

const ENDPOINTS_TV = {
  getAllTVs: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`,
};

const imgBaseURL = 'https://image.tmdb.org/t/p/w500/';

async function getMovies() {
  const response = await fetch(ENDPOINTS_MOVIE.getAllMovies);
  const data = await response.json();

  const dataMovie = data.results;
  if (response.status === 200) {
    insertPosters(dataMovie);
  } else{
    console.error(`Hubo un error ${response.status}`);
  }
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
    labelMovie.id = 'input-fav';

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.className = 'input-heart';
    input.name = 'favorite';
    input.id = 'input-fav';
    input.addEventListener('change', (e) => {
      if (e.target.checked) {
        labelMovie.classList.add('checked')
      } else {
        labelMovie.classList.remove('checked');
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
  });
  
}

getMovies();

// function getRandomNumber() {
//   const min = 0;
//   const max = 10;
//   const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
//   getCharactersDB(randomNumber);
// }

// dragonBallButton.addEventListener('click', () => {
//   getRandomNumber()
// })
