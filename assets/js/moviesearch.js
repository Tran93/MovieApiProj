const searchButton = document.getElementById('searchButton');  // Make sure this ID matches the one in your HTML
const searchInput = document.getElementById('searchBar');  // Make sure this ID matches the one in your HTML
const resultsContainer = document.getElementById('results-container');
const detailsContainer = document.getElementById('details-container');

// Event listener for the search button
searchButton.addEventListener('click', searchMovieById);

function searchMovieById() {
  // Get the movie ID from the input field
  const movieId = searchInput.value;

  // Call the searchMovies function, passing the movie ID
  searchMoviesById(movieId);
}

// Function that handles the movie search by ID
function searchMoviesById(movieId) {
  // Clear previous results and details
  resultsContainer.innerHTML = "";
  detailsContainer.innerHTML = "";

  // Use the movieId parameter in the URL
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
    .then(response => response.json())
    .then(movie => {
      // Display the movie details on the page
      const detailsElement = document.createElement('div');
      detailsElement.innerHTML = `
        <h2>${movie.title}</h2>
        <p>Release Year: ${movie.release_year}</p>
        <p>Director: ${movie.director}</p>
      `;
      detailsContainer.appendChild(detailsElement);
    })
    .catch(error => {
      console.error('Error:', error);
      // Display an error message on the page
      const errorElement = document.createElement('div');
      errorElement.textContent = 'Movie not found.';
      detailsContainer.appendChild(errorElement);
    });
}
