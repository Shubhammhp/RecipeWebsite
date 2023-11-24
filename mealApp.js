const searchInput = document.getElementById('search');
const searchResults = document.getElementById('searchResults');

let favorites = getFavoritesFromLocalStorage(); // Retrieve favorites from local storage

// Event listener to the search input with debounce function
searchInput.addEventListener('input', debounce(searchMeals, 300));
// Debounce function to delay the execution of the searchMeals function
function debounce(func, delay) {
    let timeoutId;
    return function () {
        
        clearTimeout(timeoutId);
        // Set a new timeout for the specified delay
        timeoutId = setTimeout(() => {
            // Execute the provided function
            func.apply(this, arguments);
        }, delay);
    };
}

// Function to handle the search for meals
function searchMeals() {
    // Get the trimmed and lowercase search term from the input
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === '') {
        // If the search term is empty, clear the search results and return
        clearSearchResults();
        return;
    }
    // Fetch meals from the API based on the search term
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            // Extract the meals array from the API response
            const mealsArray = data.meals || [];
            displaySearchResults(mealsArray);
        })
        .catch(error => console.error('Error fetching meals:', error));
}


// Function to display search results
function displaySearchResults(mealsArray) {
    // Clear the existing search results
    clearSearchResults();

    // Iterate through the meals array and create list items for each meal
    mealsArray.forEach(meal => {
        const listItem = document.createElement('li');
        // Add a click event listener to show meal details when clicked
        listItem.textContent = meal.strMeal;

        listItem.addEventListener('click', () => showMealDetails(meal));
        //Create a favorite button for each meal
        const favoriteBtn = document.createElement('button');
        favoriteBtn.textContent = 'Add to Favorites';
        favoriteBtn.className = 'favorite-btn';
        // Add a click event listener to add the meal to favorites
        favoriteBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            addFavorite(meal);
        });
        // Append the favorite button to the list item
        listItem.appendChild(favoriteBtn);
        // Append the list item to the search results
        searchResults.appendChild(listItem);
    });
}
// Function to clear the search results
function clearSearchResults() {
    searchResults.innerHTML = '';
}
// Function to add a meal to the favorites list
function addFavorite(meal) {
    favorites.push(meal);
    saveFavoritesToLocalStorage(favorites);
    // Display an alert notifying the user that the meal has been added to favorites
    alert(`"${meal.strMeal}" has been added to your favorites!`);
}
// Function to show meal details by redirecting to a detail page with the meal ID
function showMealDetails(meal) {
    // Assuming the API provides a unique meal ID
    const mealId = meal.idMeal; 

    // Redirect to the meal detail page with the meal ID as a parameter
    window.location.href = `mealDetail.html?id=${mealId}`;
}
// Function to retrieve favorites from local storage
function getFavoritesFromLocalStorage() {
    const favoritesJSON = localStorage.getItem('favorites');
    return JSON.parse(favoritesJSON) || [];
}
// Function to save favorites to local storage
function saveFavoritesToLocalStorage(favorites) {
    // Convert the favorites array to JSON and store it in local storage
    const favoritesJSON = JSON.stringify(favorites);
    localStorage.setItem('favorites', favoritesJSON);
}