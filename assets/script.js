document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Loaded');
    const movieCarousel = document.getElementById('movieCarousel');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const totalImages = document.querySelectorAll('.movie-card').length;

    let currentPage = 0;
    console.log('Total Images:', totalImages);

   
    prevButton.addEventListener('click', function () {
        console.log('Previous Button Clicked');
        currentPage = (currentPage - 1 + totalImages) % totalImages;
        updateCarousel();
    });

    nextButton.addEventListener('click', function () {
        console.log('Next Button Clicked');
        currentPage = (currentPage + 1) % totalImages;
        updateCarousel();
    });

    function calculateOffset(page) {
        return -page * 100; 
    }

    function updateCarousel() {
        console.log('Updating Carousel');
        const offset = calculateOffset(currentPage);
        movieCarousel.style.transform = `translate(${offset}%, 0)`;
    }

    
    updateCarousel();
});
   
    fetchUpcomingMovies();


async function fetchUpcomingMovies(page = 1) {
    const apiKey = '51DDA431-DE95-4ECF-A96B-BC92A71E8EA1';
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`;

    try {
        const response = await fetch(apiUrl);
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
