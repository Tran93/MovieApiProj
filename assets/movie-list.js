const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.themoviedb.org/3/movie/changes?page=1', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));