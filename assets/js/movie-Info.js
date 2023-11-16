let apiKey = '51DDA431-DE95-4ECF-A96B-BC92A71E8EA1'
let searchForm = document.getElementById('search-form');

//function to search for theatres in the city using the city name input from user
async function searchCityTheatres() {
    let cityInput = document.getElementById('city-input');
    let city = cityInput.value;

    // Update the API endpoint to the v2 version
    let apiUrl = `https://developer.amctheatres.com/v2/theaters?city=${city}&apiKey=${apiKey}`;

    try {
        // Make a request to the AMC API
        let response = await fetch(apiUrl);

        // Check if the request was successful
        if (response.ok) {

            let theaters = await response.json();

            // Display the theaters in the container
            displayTheaters(theaters);
        } else {
            // Handle the error if the request was not successful
            console.error('Theatres not found:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

//Function to display theatres in the city to the html
function displayTheaters(theaters) {
    const theatresContainer = document.getElementById('theaters-container');

    // Clear the container just in case something is already there before we add info
    theatresContainer.innerHTML = '';

    if (theatres.length === 0) {
    // If no theatres are found show message
        theatresContainer.innerHTML = '<p>No theatres found.</p>';

    } else {
        let theatersHTML = theaters.map(function (theater) {
            return `
                <div class="theater">
                    <h3>${theater.name}</h3>
                    <p>Address: ${theater.address}</p>
                    <p>Phone: ${theater.phone}</p>
                </div>
            `;
        });
        theatresContainer.innerHTML = theatersHTML.join('');

    }
};

document.getElementById('search-city-button').addEventListener('click', searchCityTheatres);