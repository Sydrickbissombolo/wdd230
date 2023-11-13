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
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');

    gridViewButton.addEventListener('click', function () {
        toggleView('grid');
    });

    listViewButton.addEventListener('click', function () {
        toggleView('list');
    });
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

function toggleView(viewType) {
  const memberContainer = document.getElementById('member-container');
  memberContainer.classList.remove('grid-view', 'list-view');

  if (viewType === 'grid') {
    memberContainer.classList.add('grid-view');
  } else if (viewType === 'list') {
    memberContainer.classList.add('list-view');
  }
}


