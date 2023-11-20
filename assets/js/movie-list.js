const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWY0YTUyYzFmYjZlNjllNzc1NzU3NDA3N2RlNDRhYSIsInN1YiI6IjY1NGM1ZWQ2NTMyYWNiNTMzNzFmNWNjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OauQL4aPmEx0tUe8ebpLiW8CV7uaaQ3kdM1O3aMw-5M'
  }
};

//-------- Use of the API --------//

//overview
//original_language
//origin_title
//title
//popularity
//poster_path
//release_date
//vote_average
//vote_count

// Create a function that can be easily modified to fetch different movies
async function fetchAndDisplayMovies() {
  let page = 1;

  try {
    while (true) {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const upcomingMovies = data;

      // Display movies one by one
      await displayMovies(upcomingMovies.results);

      // Check if there is a next page
      if (upcomingMovies.page < upcomingMovies.total_pages) {
        page++; // Move to the next page
      } else {
        break; // Exit the loop if there are no more pages
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// Create a function that displays movies one by one
async function displayMovies(movies) {
  const movieDetailsContainer = document.getElementById('movie-details-container');
  
  for (const movie of movies) {

    const roundedPopularity = Math.round(movie.popularity);
    const roundedVoteAverage = Math.round(movie.vote_average);

    const movieInfo = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
    `;

    // Create a new element for each movie and append it to the container
    const movieElement = document.createElement('div');
    movieElement.innerHTML = movieInfo;
    movieDetailsContainer.appendChild(movieElement);

    // Automatically scroll down to show the newly added movie
    movieDetailsContainer.scrollTop = movieDetailsContainer.scrollHeight;

    // Add a delay before displaying the next movie (1 minute in this case)
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
};

//wait for the DOM to load
document.addEventListener('DOMContentLoaded', async () => {
  await fetchAndDisplayMovies();
});


  
