// Get references to HTML elements
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const detailsContainer = document.getElementById('details-container');

// Event listener for the search button
searchButton.addEventListener('click', searchMovieById);

function searchMovieById() {
  // Get the movie ID from the input field
  const movieId = searchInput.value;

  // Call the searchMovies function, passing the movie ID
  searchMovies(movieId);
};

// Function that handles the movie search by ID
function searchMovies() {

  // Clear previous results and details
  resultsContainer.innerHTML = "";
  detailsContainer.innerHTML = "";


fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(movie => {
      // Display the movie details on the page
      const detailsElement = document.createElement('div');
      detailsElement.innerHTML = `
        <h2>${movie.title}</h2>
        <p>Release Year: ${movie.release_year}</p>
        <p>Director: ${movie.director}</p>
        
      `;
      detailsContainer.innerHTML = "";
      detailsContainer.appendChild(detailsElement);
    })
    .catch(error => {
      console.error('Error:', error);
      // Display an error message on the page
      const errorElement = document.createElement('div');
      errorElement.textContent = 'Movie not found.';
      detailsContainer.innerHTML = "";
      detailsContainer.appendChild(errorElement);
    });
  }