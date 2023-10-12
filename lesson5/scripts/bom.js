const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

button.addEventListener('click', function() {
    //line of code
});

if (input.value != '') {
    //codes goes here
}

const li = document.createElement('li');
const deleteButton = document.createElement('button');

li.textContent = input.value;// populate the li element textcontent or innerHTML
deleteButton.textContent = '❌'// populate the button textcontent with a X
li.append(deleteButton);// append the li elemet with the delete button
list.append(li);// append the li element to the unordered list in the HTML

// add an event listener to the delete button that removes the li element when clicked
deleteButton.addEventListener('click', function() {
    list.removeChild(li);
    input.focus();
});

input.focus();// send the focus to the input element


input.value = ''; //change the input value to nothing or the empty string to clean up the interface for the user