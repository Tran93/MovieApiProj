const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWY0YTUyYzFmYjZlNjllNzc1NzU3NDA3N2RlNDRhYSIsInN1YiI6IjY1NGM1ZWQ2NTMyYWNiNTMzNzFmNWNjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OauQL4aPmEx0tUe8ebpLiW8CV7uaaQ3kdM1O3aMw-5M',
  },
};

let currentPage = 1; 
const movieCarousel = document.getElementById('movieCarousel');


fetchAndDisplayMoviesWithDelay(currentPage);


setInterval(() => {
  currentPage++;
  fetchAndDisplayMoviesWithDelay(currentPage);
}, 5000);


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAndDisplayMoviesWithDelay(page) {
  try {
    const apiKey = '51DDA431-DE95-4ECF-A96B-BC92A71E8EA1';
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`;
    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const upcomingMovies = data.results;

    
    console.log('API Response:', data);

    
    movieCarousel.innerHTML = '';

    upcomingMovies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      movieCarousel.appendChild(movieCard);
    });
  } catch (error) {
    console.error(`Error fetching upcoming movies: ${error.message}`);
  }
}

function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  
  const title = document.createElement('h3');
  title.textContent = movie.title;

  
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  
  console.log('Poster URL:', posterUrl);

  const poster = document.createElement('img');
  poster.src = posterUrl;
  poster.alt = movie.title;

  movieCard.appendChild(title);
  movieCard.appendChild(poster);

  return movieCard;
}
