const currentYearSpan = document.getElementById("currentYear");
const currentYear = new Date().getFullYear();
const lastModifiedParagraph = document.getElementById("lastModified");
const lastModified = new Date(document.lastModified);
lastModifiedParagraph.textContent = "Last Modified: " + lastModified.toLocaleString();
