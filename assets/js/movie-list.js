const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWY0YTUyYzFmYjZlNjllNzc1NzU3NDA3N2RlNDRhYSIsInN1YiI6IjY1NGM1ZWQ2NTMyYWNiNTMzNzFmNWNjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OauQL4aPmEx0tUe8ebpLiW8CV7uaaQ3kdM1O3aMw-5M'
  }
};
var upcomingMovies = options

fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  
