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

// Create a function that can be easily modified to fetch different movies.
async function fetchUpcomingMovies() {
  let page = 1;

  try {
    while (true) {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}, `, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const upcomingMovies = data;

      console.log(upcomingMovies);

      upcomingMovies.results.forEach(async (movie, index) => {
        console.log(`
          \nTitle | ${movie.title}
          \nRelease Date | ${movie.release_date} 
          \nPopularity | ${movie.popularity} 
          \nVote Average | ${movie.vote_average}
          \nReview | ${movie.overview}`);

          if (index < upcomingMovies.results.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 300000));

          }
      });

      // Check if there is a next page
      if (upcomingMovies.page < upcomingMovies.total_pages) {
        //Add a delay to prevent hitting the API rate limit
        await new Promise(resolve => setTimeout(resolve, 300000));

        page++; // Move to the next page
      } else {
        break; // Exit the loop if there are no more pages
      }
    }
  } catch (err) {
    console.error(err);
  }
}

fetchUpcomingMovies();

  
