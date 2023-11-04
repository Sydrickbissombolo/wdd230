function check(input) {
    if (input.value != document.getElementById('password').value) {
        input.setCustomValidity('Passwords must match.');
    } else {
        // input is valid -- reset the error message
        input.setCustomValidity('');
    }
}


const lastModifiedParagraph = document.getElementById("lastModified");
const lastModifiedDate = new Date(document.lastModified);
lastModifiedParagraph.textContent = "Last modification: " + lastModifiedDate.toDateString();