/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

// Your code goes here...

const container = document.querySelector('.cardsContainer');

function getFavorites() {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addToFavorites(id) {
  const favorites = getFavorites();
  if (favorites.includes(id) === false) {
    favorites.push(id);
    saveFavorites(favorites);
  }
}

function setItemBackground(item, isFavorite) {
  item.style.backgroundColor = isFavorite ? 'red' : 'white';
}

function removeFromFavorites(id) {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(favId => favId !== id);
  saveFavorites(updatedFavorites);
}

function isInFavorites(id) {
  const favorites = getFavorites();
  return favorites.includes(id);
}

function applyFavoritesOnLoad() {
  const favorites = getFavorites();
  favorites.forEach(id => {
    const item = document.getElementById(id);
    if (item) {
      setItemBackground(item, true);
    }
  });
}

function handleItemClick(event) {
  if (event.target.classList.contains('card')) {
    const item = event.target;
    const itemId = item.id;
    const isFavorite = isInFavorites(itemId);
    if (isFavorite) {
      removeFromFavorites(itemId);
    } else {
      addToFavorites(itemId);
    }
    setItemBackground(item, isFavorite === false);
  }
}

applyFavoritesOnLoad();
container.addEventListener('click', handleItemClick);
