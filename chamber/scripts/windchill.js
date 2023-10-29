let temperature = 32;
let windSpeed = 5;
let windChillElement = document.getElementById('windChill');


if (temperature <= 50 && windSpeed > 3.0) {
    let windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + temperature * Math.pow(windSpeed, 0.16);
    windChillElement.textContent = Math.round(windChill * 100) / 100 + "°F";
} else {
    windChillElement.textContent = "N/A";
}