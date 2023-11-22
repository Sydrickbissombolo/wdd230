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

    // Display message based on the last visit date
    var lastVisit = localStorage.getItem("lastVisit");
    var currentDate = Date.now();
    var messageArea = document.getElementById("visit-message");
    if (!lastVisit) {
      messageArea.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      lastVisit = parseInt(lastVisit);
      var daysElapsed = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
      if (daysElapsed < 1) {
        messageArea.textContent = "Back so soon! Awesome!";
      } else {
        var message = daysElapsed === 1 ? "day" : "days";
        messageArea.textContent = "You last visited " + daysElapsed + " " + message + " ago.";
      }
    }
    localStorage.setItem("lastVisit", currentDate.toString());
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

// toggle menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');

  hamburgerMenu.addEventListener('click', function () {
      this.classList.toggle('change');
      mobileNav.classList.toggle('show');
  });

  // Optional: Close the mobile menu when a nav link is clicked
  const navLinks = document.querySelectorAll('.mobile-nav a');
  navLinks.forEach(link => {
      link.addEventListener('click', function () {
          hamburgerMenu.classList.remove('change');
          mobileNav.classList.remove('show');
      });
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

function calculateWindChill(temperature, windSpeed) {
  // Formula to calculate wind chill
  return Math.round(13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16));
}
