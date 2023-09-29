const currentYearSpan = document.getElementById("currentYear");
const currentYear = new Date().getFullYear();
const lastModifiedParagraph = document.getElementById("lastModified");
const lastModified = new Date(document.lastModified);
lastModifiedParagraph.textContent = "Last Modified: " + lastModified.toLocaleString();


const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");  // toggle the show class
})