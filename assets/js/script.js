// Get references to HTML elements
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const detailsContainer = document.getElementById('details-container');

// Event listener for the search button
//searchButton.addEventListener('click', searchMovies);

// Function that handles the movie search
function searchMovies() {
  // Clear previous results
  resultsContainer.innerHTML = "";
  detailsContainer.innerHTML = "";

  // Get the user's search query
  const searchQuery = searchInput.value;

  // Make the API call to search for movies
  fetch(`https://api.example.com/movies?search=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      // Process the returned list of movies
      const movies = data.results;

      // Loop through the movies and display them on the page
      movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.textContent = movie.title;
        movieElement.addEventListener('click', () => {
          getMovieDetails(movie.id);
        });
        resultsContainer.appendChild(movieElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to get movie details by movie ID
function getMovieDetails(movieId) {
  // Make the API call to get movie details
  fetch(`https://api.themoviedb.org/3/movies/${movieId}`)
    .then(response => response.json())
    .then(movie => {
      // Display the movie details on the page
      const detailsElement = document.createElement('div');
      detailsElement.innerHTML = `
        <h2>${movie.title}</h2>
        <p>Release Year: ${movie.release_year}</p>
        <p>Director: ${movie.director}</p>
        <p>Actors: ${movie.actors.join(', ')}</p>
        <p>Plot: ${movie.plot}</p>
      `;
      detailsContainer.innerHTML = "";
      detailsContainer.appendChild(detailsElement);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
