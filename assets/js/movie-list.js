const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWY0YTUyYzFmYjZlNjllNzc1NzU3NDA3N2RlNDRhYSIsInN1YiI6IjY1NGM1ZWQ2NTMyYWNiNTMzNzFmNWNjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OauQL4aPmEx0tUe8ebpLiW8CV7uaaQ3kdM1O3aMw-5M'
  }
};

//overview
//original_language
//origin_title
//title
//popularity
//poster_path
//release_date
//vote_average
//vote_count

async function fetchUpcomingMovies() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const upcomingMovies = data;

    console.log(upcomingMovies);

    upcomingMovies.results.forEach(movie => {
      console.log(`
        \nTitle | ${movie.title}
        \nRelease Date | ${movie.release_date} 
        \nPopularity | ${movie.popularity} 
        \nVote Average | ${movie.vote_average}
        \nReview | ${movie.overview}`);
    });
  } catch (err) {
    console.error(err);
  }
};

fetchUpcomingMovies();

  
