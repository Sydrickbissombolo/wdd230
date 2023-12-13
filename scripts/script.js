// Weather script
document.addEventListener("DOMContentLoaded", function () {
  const apiKey = 'eac1da47236a8fe587a56e2522f38bd7';
  const city = 'Brazzaville';
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
  const weatherIconContainer = document.getElementById('weather-icon');
  const temperatureElement = document.getElementById('temperature');
  const weatherConditionElement = document.getElementById('weather-condition');
  const humidityElement = document.getElementById('humidity');
  const windSpeedElement = document.getElementById('wind-speed');
  const windChillElement = document.getElementById('windChill');

  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const weatherCondition = data.weather[0].description;

  weatherIconContainer.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon"><span>${temperature} °C</span>`;
  

  weatherConditionElement.textContent = weatherCondition;
  humidityElement.textContent = `${humidity}%`;
  windSpeedElement.textContent = `${windSpeed} mph`;

  // Calculate wind chill if temperature and wind speed are available
  if (temperature !== undefined && windSpeed !== undefined) {
      const windChill = calculateWindChill(temperature, windSpeed);
      windChillElement.textContent = `${windChill} °C`;
  }
}

// Function to fetch and display a three-day forecast
function fetchThreeDayForecast() {
  const forecastApiKey = 'ccc40f172c1d984a2c5ada7b91217041';
  const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat={-4.2634}&lon={15.2429}&exclude=current,minutely,hourly,alerts&appid={API_KEY}';

  fetch(forecastApiUrl)
    .then(response => response.json())
    .then(data => {
      displayThreeDayForecast(data);
    })

    .catch(error => {
      console.error('Error fetching forecast data:', error);
    });
}

// Function to display three-day forecast
function displayThreeDayForecast(data) {
  const forecastElement = document.getElementById('weather-info');
  const forecastList = data.list;

  //Display the forecast for the next three days
  for (let i = 0; i < forecastList.length; i =+ 8) {
    const forecastItem = forecastList[i];
    const forecastDate = new Date(forecastItem.dt * 1000);
    const forecastTemperature = forecastItem.main.temp;
    const forecastWeatherCondition = forecastItem.weather[0].description;

    const forecastHtml = `<p>${forecastDate.toDateString()} - ${forecastTemperature} °C, ${forecastWeatherCondition}</p>`;
    forecastElement.innerHTML += forecastHtml;
  }

  

  fetchThreeDayForecast();
}

function calculateWindChill(temperature, windSpeed) {
  // Formula to calculate wind chill
  return Math.round(13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16));
}




  //LAST MODIFIED
  const currentYearSpan = document.getElementById("currentYear");
const currentYear = new Date().getFullYear();
const lastModifiedParagraph = document.getElementById("lastModified");
const lastModified = new Date(document.lastModified);
lastModifiedParagraph.textContent = "Last Modified: " + lastModified.toLocaleString();

// RENTALS

//DisplayRentals function
function displayRentals(rentals) {
  console.log("Rental Data:", rentals);
}
document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from rentals.json
  fetch('./data/rentals.json')
      .then(response => response.json())
      .then(data => {
          // Display rentals
          displayRentals(data.rentalTypes);

          // Create the table
          createTable(data);
      })
      .catch(error => {
          console.error('Error fetching rental data:', error);
      });
});

function createTable(data) {
  var tableHtml = '<table>';
  tableHtml += '<thead><tr><th colspan="6">Max Rental Pricing</th></tr><tr><th>Rental Type</th><th>Max Persons</th><th>Reservation - Half Day</th><th>Reservation - Full Day</th><th>Walk-In - Half Day</th><th>Walk-In - Full Day</th></tr></thead>';
  tableHtml += '<tbody>';

  data.rentalTypes.forEach(function (rentalType) {
    tableHtml += '<tr>';
    tableHtml += '<td>' + rentalType.type + '</td>';
    tableHtml += '<td>' + rentalType.maxPersons + '</td>';
    tableHtml += '<td>$' + rentalType.reservation.halfDay + '</td>';
    tableHtml += '<td>$' + rentalType.reservation.fullDay + '</td>';
    tableHtml += '<td>$' + rentalType.walkIn.halfDay + '</td>';
    tableHtml += '<td>$' + rentalType.walkIn.fullDay + '</td>';
    tableHtml += '</tr>';
  });

  tableHtml += '</tbody></table>';

  // Append the table to the rentalTable div
  document.getElementById('rentalTable').innerHTML = tableHtml;
}

//Submit Message

function SubmitForm() {

  showSuccessMessage();
}

function showSuccessMessage() {

    //Hide the form
  document.getElementById('reservation-form').style.display = 'none';
  
  //Display the Success message
  document.getElementById('success-message').style.display = 'block';
}

// RESPONSIVE HAMBURGER MENU SCRIPT
document.addEventListener('DOMContentLoaded', function () {
  // Get the necessary elements
  const mobileMenu = document.querySelector('.mobile-menu');
  const nav = document.querySelector('nav');

  // Event listener for the hamburger menu button
  mobileMenu.addEventListener('click', function () {
      console.log('Hamburger menu clicked!');
      nav.classList.toggle('show');
  });

  // The window width initially and on resize
  function checkWindowSize() {
      if (window.innerWidth <= 600) {
          mobileMenu.style.display = 'flex';
          nav.style.display = 'none';
      } else {
          mobileMenu.style.display = 'none';
          nav.style.display = 'flex';
      }
  }

  // Initial check
  checkWindowSize();

  // Event listener for window resize
  window.addEventListener('resize', checkWindowSize);
});
