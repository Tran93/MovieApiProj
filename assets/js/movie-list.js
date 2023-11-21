document.addEventListener('DOMContentLoaded', () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWY0YTUyYzFmYjZlNjllNzc1NzU3NDA3N2RlNDRhYSIsInN1YiI6IjY1NGM1ZWQ2NTMyYWNiNTMzNzFmNWNjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OauQL4aPmEx0tUe8ebpLiW8CV7uaaQ3kdM1O3aMw-5M',
    },
  };

  let currentPage = 1;
  const movieCarousel = document.getElementById('movieCarousel');
  const searchBar = document.getElementById('searchBar');

  // Fetch and display the initial set of movies
  fetchAndDisplayMoviesWithDelay(currentPage);

  // Set up an interval to fetch and display movies every 5 seconds (adjust the duration as needed)
  setInterval(() => {
    currentPage++;
    fetchAndDisplayMoviesWithDelay(currentPage);

    // Check if it reaches the end of the movie list and reset to the first page
    if (currentPage === maxPages) {
      currentPage = 1;
    }
  }, 10000);

  let maxPages; // Variable to store the maximum number of pages

  // Move the delay function declaration outside of the fetchAndDisplayMoviesWithDelay function
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  document.getElementById('searchButton').addEventListener('click', async () => {
    const searchTerm = searchBar.value;
    if (searchTerm.trim() !== '') {
      await searchMovies(searchTerm);
    } else {
    
      fetchAndDisplayMoviesWithDelay(1);
    }
  });

  async function fetchAndDisplayMoviesWithDelay(page) {
    try {
      const authToken = options.headers.Authorization.split(' ')[1];
      let apiUrl;

     
      if (page === 1) {
        apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${authToken}&language=en-US&page=${page}`;
      } else {
        const searchTerm = searchBar.value;
        if (!searchTerm) {
          apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${authToken}&language=en-US&page=${page}`;
        } else {
          apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${authToken}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
        }
      }

      const response = await fetch(apiUrl, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const movies = data.results;

      // Set maxPages when fetching for the first time
      if (page === 1) {
        maxPages = data.total_pages;
      }

      // Log the API response for debugging
      console.log('API Response:', data);

      // Clear existing content in the movieCarousel
      movieCarousel.innerHTML = '';

      movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieCarousel.appendChild(movieCard);

        // Add click event listener to each movie card
        movieCard.addEventListener('click', () => {
          // Handle the click event and fetch detailed information about the clicked movie
          fetchMovieDetails(movie.id);
        });
      });
    } catch (error) {
      console.error(`Error fetching movies: ${error.message}`);
    }
  }

  function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    // Example: Display movie title and poster
    const title = document.createElement('h3');
    title.textContent = movie.title;

    // Construct the poster URL
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    // Log the poster URL for debugging
    console.log('Poster URL:', posterUrl);

    const poster = document.createElement('img');
    poster.src = posterUrl;
    poster.alt = movie.title;

    movieCard.appendChild(title);
    movieCard.appendChild(poster);

    return movieCard;
  }

  // Function to fetch detailed information about a specific movie
  async function fetchMovieDetails(movieId) {
    try {
      const authToken = options.headers.Authorization.split(' ')[1];
      const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${authToken}&language=en-US`;
      const response = await fetch(detailsUrl, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const movieDetails = await response.json();

      // Log detailed information for debugging
      console.log('Movie Details:', movieDetails);

      // You can now use the movieDetails to display information about the clicked movie
      // For example, update a modal or a separate section on your page with the details
      // You can create a function to handle this, depending on your page structure
      displayMovieDetails(movieDetails);
    } catch (error) {
      console.error(`Error fetching movie details: ${error.message}`);
    }
  }

  // Example function to display movie details (replace this with your implementation)
  function displayMovieDetails(details) {
    // Get references to modal elements
    const modal = document.getElementById('movieModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalOverview = document.getElementById('modalOverview');
    const modalReleaseDate = document.getElementById('modalReleaseDate');

    // Check if modal and required elements exist
    if (modal && modalTitle && modalOverview && modalReleaseDate) {
      // Populate modal elements with movie details
      modalTitle.textContent = details.title;
      modalOverview.textContent = details.overview;
      modalReleaseDate.textContent = `Release Date: ${details.release_date}`;
      // Add more lines to populate other elements as needed
      modal.classList.add('open');
      // Show the modal
      modal.style.display = 'block';
      const modalRect = modal.getBoundingClientRect();
      if (modalRect.left < 0) {
        modal.style.left = '0';
      }
    } else {
      console.error('Error: Modal or its elements not found.');
    }
  }

  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('movieModal');
    if (modal) {
      modal.style.display = 'none';
    } else {
      console.error('Error: Modal not found.');
    }
  }

  // Close the modal if the user clicks outside of it
  window.onclick = function(event) {
    const modal = document.getElementById('movieModal');
    if (modal && event.target === modal) {
      modal.style.display = 'none';
    }
  };

  // Function to show slide
  function showSlide(event) {
    // Your carousel logic here

    // Prevent the default behavior of the link
    event.preventDefault();
    return false;
  }

  // Function to handle movie search
  async function searchMovies(searchTerm) {
    try {
      const authToken = options.headers.Authorization.split(' ')[1];
      // Fetch and display search results
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${authToken}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;

      const response = await fetch(apiUrl, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const movies = data.results;

      // Rest of your code for processing the movies...
      // Clear existing content in the movieCarousel
      movieCarousel.innerHTML = '';

      movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieCarousel.appendChild(movieCard);

        // Add click event listener to each movie card
        movieCard.addEventListener('click', () => {
          // Handle the click event and fetch detailed information about the clicked movie
          fetchMovieDetails(movie.id);
        });
      });
    } catch (error) {
      console.error(`Error fetching search results: ${error.message}`);
    }
  }
});
