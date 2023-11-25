let temperature = 32;
let windSpeed = 5;
let windChillElement = document.getElementById('windChill');


if (temperature <= 50 && windSpeed > 3.0) {
    let windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + temperature * Math.pow(windSpeed, 0.16);
    windChillElement.textContent = Math.round(windChill * 100) / 100 + "°F";
} else {
    windChillElement.textContent = "N/A";
}

// Function to display three-day forecast
function displayThreeDayForecast(data) {
    const forecastElement = document.getElementById('weather-forecast');
    const forecastList = data.daily; // Change this line
  
    // Clear existing content
    forecastElement.innerHTML = "";
  
    // Display the forecast for the next three days
    for (let i = 1; i <= 3; i++) {
      const forecastItem = forecastList[i];
      const forecastDate = new Date(forecastItem.dt * 1000);
      const forecastTemperature = forecastItem.temp.day;
      const forecastWeatherCondition = forecastItem.weather[0].description;
  
      const forecastHtml = `<p>${forecastDate.toDateString()} - ${forecastTemperature} °C, ${forecastWeatherCondition}</p>`;
      forecastElement.innerHTML += forecastHtml;
    }
  }

  