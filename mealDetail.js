// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Extract the meal ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('id');

    if (mealId) {
        // Fetch meal details based on the provided meal ID
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(response => response.json())
            .then(data => {
                // Retrieve the meal data or show an alert if not found
                const meal = data.meals && data.meals[0];
                if (meal) {
                    displayMealDetails(meal);
                } else {
                    alert('Meal not found!');
                }
            })
            .catch(error => console.error('Error fetching meal details:', error));
    } else {
        alert('Meal ID not provided!');
    }
});
// Function to display meal details
function displayMealDetails(meal) {
    const mealInfo = document.getElementById('mealInfo');
    mealInfo.innerHTML = '';
    // Access the document body for styling adjustments
    const body = document.body;
    body.style.margin = '0';
    body.style.background = `rgba(255, 255, 255, 0.1) url(${meal.strMealThumb}) no-repeat center center fixed`;
    body.style.backgroundSize = 'cover';
    // Create and style the meal name element
    const mealName = document.createElement('h2');
    mealName.textContent = meal.strMeal;
    mealName.style.fontFamily = 'Times New Roman, Times, serif';
    mealName.style.fontSize = '44px'; 
    mealName.style.color = 'rgba(0, 0, 0, 1)';
    mealName.style.border = '1px solid black';
    mealName.style.padding = '4px';
    mealName.style.borderTopLeftRadius = '10px';
    mealName.style.borderBottomRightRadius = '10px';
    mealName.style.width = 'fit-content';
    mealName.style.display = 'block';
    mealName.style.margin = 'auto'; 
    mealName.style.marginTop = '5vh';
    mealName.style.marginBottom = '5vh';
    mealName.style.backgroundColor = '#FEFAE0';

    // Create and style the meal image element
    const mealImage = document.createElement('img');
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;
    mealImage.style.display = 'block'; 
    mealImage.style.margin = 'auto'; 
    mealImage.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)'; 
    mealImage.style.borderRadius = '20%';
    // Create and style the instructions element
    const instructions = document.createElement('p');
    instructions.textContent = meal.strInstructions;
    instructions.style.border = '1px solid transparent'; 
    instructions.style.padding = '10px';
    instructions.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    instructions.style.width = '80%';
    instructions.style.marginLeft = '9%';
    instructions.style.padding = '2%';
    instructions.style.fontWeight = '900';
    instructions.style.color = 'black';
    instructions.style.fontFamily = 'Times New Roman';
    instructions.style.fontSize = '20px';
    instructions.style.borderTopLeftRadius = '30px';
    instructions.style.borderBottomRightRadius = '30px';
    mealInfo.style.background = `rgba(255, 255, 255, 0.1) url(${mealImage.src}) no-repeat center center fixed`;
    mealInfo.style.backgroundSize = 'cover';
    instructions.style.backgroundColor = '#FEFAE0';
    // Append elements to the mealInfo container
    mealInfo.appendChild(mealName);
    mealInfo.appendChild(mealImage);
    mealInfo.appendChild(instructions);
}

