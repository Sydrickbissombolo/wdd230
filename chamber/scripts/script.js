const lastModifiedParagraph = document.getElementById("lastModified");
const lastModifiedDate = new Date(document.lastModified);
lastModifiedParagraph.textContent = "Last modification: " + lastModifiedDate.toDateString();


document.addEventListener("DOMContentLoaded", function () {
    // Lazy loading images when scrolling
    let images = document.querySelectorAll('img[data-src]');
    const loadImages = (image) => {
      image.setAttribute('src', image.getAttribute('data-src'));
      image.onload = () => {
        image.removeAttribute('data-src');
      };
    };
    const imgOptions = {
      threshold: 1,
      rootMargin: "0px 0px 200px 0px"
    };
    if ('IntersectionObserver' in window) {
      const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          } else {
            loadImages(entry.target);
            imgObserver.unobserve(entry.target);
          }
        });
      }, imgOptions);
      images.forEach((img) => {
        imgObserver.observe(img);
      });
    } else {
      images.forEach((img) => {
        loadImages(img);
      });
    }

     // Check if this is the user's first visit
if (!localStorage.getItem('lastVisit')) {
  document.querySelector('.sidebar').innerHTML += "<p>Welcome! Let us know if you have any questions.</p>";
} else {
  // Calculate the number of days since the last visit
  var currentDate = new Date();
  var lastVisitDate = new Date(parseInt(localStorage.getItem('lastVisit')));

  var timeDifference = currentDate - lastVisitDate;
  var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Display the appropriate message
  if (daysDifference === 0) {
      document.querySelector('.sidebar').innerHTML += "<p>Back so soon! Awesome!</p>";
  } else {
      var daysText = daysDifference === 1 ? 'day' : 'days';
      document.querySelector('.sidebar').innerHTML += "<p>You last visited " + daysDifference + " " + daysText + " ago.</p>";
  }
}

// Store the current visit date in localStorage
localStorage.setItem('lastVisit', Date.now());

  });

// Directory page
document.addEventListener('DOMContentLoaded', function () {
  fetch('data/members.json')
    .then(response => response.json())
    .then(data => displayMembers(data.members));

    // View toggle buttons
    function toggleNav() {
      const mainNav = document.querySelector('.main-nav');
      mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
  }
  

  const Date = new Date();
  const dayOfWeek = currentDate.getDay();

  if (dayOfWeek >= 1 && dayOfWeek <= 3) {
    const bannerContainer = document.getElementById('banner-container');
    const closeBannerButton = document.getElementById('close-banner-button');

    if (!localStorage.getItem('bannerClosed')) {
      bannerContainer.style.display = 'block';

      closeBannerButton.addEventListener('click', function () {
        bannerContainer.style.display = 'none';
        localStorage.setItem('bannerClosed', 'true');
      });
    }
  }
});

function displayMembers(members) {
  const memberContainer = document.getElementById('member-container');

  //Clear existing content
  memberContainer.innerHTML = "";

  //Iterate through members and display them
  members.forEach(member => {
    const memberCard = document.createElement('div');
    memberCard.classList.add('member-card');
    // customize the HTML structure for each member card or list item as needed
    memberCard.innerHTML = `
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank">${member.website}</a></p>
        <img src="${member.image}" alt="${member.name}">
        <p>Membership Level: ${member.membershipLevel}</p>
    `;
    memberContainer.appendChild(memberCard);
  })
}

function showGrid() {
  document.getElementById('memberDisplay').classList.remove('list-view');
}

function showList() {
  document.getElementById('memberDisplay').classList.add('list-view');
}

// toggle menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');

  hamburgerMenu.addEventListener('click', function () {
      this.classList.toggle('change');
      mobileNav.classList.toggle('show');
  });

});



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


// Join JS
document.getElementById("formTimestamp").value = Date.now();

  
