document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "eac1da47236a8fe587a56e2522f38bd7";
    const city = "Brazzaville";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});

function displayWeather(data) {
    const weatherIconElement = document.getElementById('weather-icon');
    const temperatureElement = document.getElementById('temperature');
    const weatherConditionElement = document.getElementById('weather-condition');
    const visitsElement = document.getElementById('visits');
    const locationElement = document.getElementById('location');

    const weatherIconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    weatherIconElement.innerHTML = `<img src="${weatherIconUrl}" alt="Weather Icon">`;

    // Updating other elements with weather data
    temperatureElement.textContent = `${data.main.temp} °C`;
    weatherConditionElement.textContent = data.weather[0].description;
    locationElement.textContent = data.name + ', ' + data.sys.country;

    // Updating the number of visits (replace 'numVisits' with the actual variable or function)
    visitsElement.textContent = numVisits;
}
