const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data.prophets); // temporary testing of data retrieval
    displayProphets(data.prophets);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    const card = document.createElement('section');
    const fullName = document.createElement('h2');
    const portrait = document.createElement('img');

    fullName.textContent = `${prophet.Russell} ${prophet.Nelson}`;
    
    portrait.setAttribute('src', prophet.imageURL);
    portrait.setAttribute('alt', prophet.fullName);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '200');
    portrait.setAttribute('height', '300'); 

    card.appendChild(fullName);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
};

// Call the function to fetch and display prophets
getProphetData();
