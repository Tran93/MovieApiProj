let apiKey = '51DDA431-DE95-4ECF-A96B-BC92A71E8EA1'
let searchForm = document.getElementById('search-form');

//function to search for theaters in the city using the city name input from user
async function searchCityTheaters() {
    let cityInput = document.getElementById('city-input');
    let city = cityInput.value;

    // Update the API endpoint to the v2 version
    let apiUrl = `https://developer.amctheaters.com/v2/theaters?city=${city}&apiKey=${apiKey}`;

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
            console.error('Theaters not found:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

//Function to display theaters in the city to the html
function displayTheaters(theaters) {
    const theatersContainer = document.getElementById('theaters-container');

    // Clear the container just in case something is already there before we add info
    theatersContainer.innerHTML = '';

    if (theaters.length === 0) {
    // If no theaters are found show message
        theatersContainer.innerHTML = '<p>No theaters found.</p>';

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
        theatersContainer.innerHTML = theatersHTML.join('');

    }
};

document.getElementById('search-city-button').addEventListener('click', searchCityTheaters);