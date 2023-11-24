// When the DOM is loaded, display the favorite meals
document.addEventListener('DOMContentLoaded', function () {
    displayFavoriteMeals();
});
// Function to display favorite meals
function displayFavoriteMeals() {
    const favoriteList = document.getElementById('favoriteList');
    favoriteList.innerHTML = '';
    // Retrieve favorite meals from local storage
    const favorites = getFavoritesFromLocalStorage();
    // Iterate through favorites and create list items
    favorites.forEach(meal => {
        const listItem = createFavoriteListItem(meal);
        favoriteList.appendChild(listItem);
    });
}
// Function to create a list item for a favorite meal
function createFavoriteListItem(meal) {
    const listItem = document.createElement('li');
    listItem.style.marginTop = '2%';
    const mealLink = document.createElement('a');
    mealLink.href = `mealDetail.html?id=${meal.idMeal}`;
    mealLink.textContent = meal.strMeal;
    mealLink.style.display = 'inline-block';
    mealLink.className = 'li-Modify';

    mealLink.addEventListener('click', (event) => {
        event.preventDefault();
        showFavoriteMealDetails(meal.idMeal);
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove from Favorites';
    removeBtn.style.marginLeft = '2%';
    removeBtn.style.display = 'inline-block';
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', () => removeFavorite(meal.idMeal));

    listItem.appendChild(mealLink);
    listItem.appendChild(removeBtn);
    return listItem;
}
// Function to show details of a favorite meal
function showFavoriteMealDetails(mealId) {
    window.location.href = `mealDetail.html?id=${mealId}`;
}
// Function to retrieve favorite meals from local storage
function getFavoritesFromLocalStorage() {
    const favoritesJSON = localStorage.getItem('favorites');
    return JSON.parse(favoritesJSON) || [];
}
// Function to save favorite meals to local storage
function saveFavoritesToLocalStorage(favorites) {
    const favoritesJSON = JSON.stringify(favorites);
    localStorage.setItem('favorites', favoritesJSON);
}
// Function to remove a favorite meal and update the display
function removeFavorite(mealId) {
    const favorites = getFavoritesFromLocalStorage();
    const updatedFavorites = favorites.filter(meal => meal.idMeal !== mealId);
    saveFavoritesToLocalStorage(updatedFavorites);
    displayFavoriteMeals();
}
