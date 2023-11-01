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