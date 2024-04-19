import { Recipes } from './class/Recipes.js';
import { categoryResultsCard } from "./renderedElements.js";

const dropdownItems = document.querySelectorAll("#navbarRecipeDropdown + .dropdown-menu .dropdown-item");
dropdownItems.forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Clicked:', item.textContent);
        const category = item.textContent;
        console.log(' Displaying recipes for category:', category);
        return window.location.href = `categoryResults.html?category=${encodeURIComponent(category)}`;
    });
});

// Filter recipes based on category parameter in URL
function filterRecipes() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (!category) return;

    const recipe = new Recipes();
    recipe.getRecipes()
        .then(recipes => {
            const categoryResultsContainer = document.getElementById('category-results');
            categoryResultsContainer.innerHTML = ''; // Clear previous results
            const displayText = document.getElementById('displayCategoryText');
            let count = 0; // Initialize count for results
            recipes.forEach(recipe => {
                if (recipe.category.toLowerCase() === category.toLowerCase()) {
                    const card = categoryResultsCard(recipe);
                    // Add event listener to redirect to new page with recipe ID
                    card.addEventListener('click', () => {
                         window.location.href = `recipePage.html?id=${recipe.id}`;
                    });
                    categoryResultsContainer.appendChild(card);
                    count++;
                }
            })
            // Display message if no results found
            if (count === 0) {
                displayText.innerHTML = `
                <strong style="text-align: center; font-size: 22px; display: block;">Oops! We couldn't find any results for ${category.toLowerCase()} category</strong>
                <img src="../images/potato.jpg" alt="No Results Found" style="display: block; margin: 90px auto; max-width: 13%;">`;
            } else {
                displayText.innerHTML = `<strong style="text-align: center; font-size: 22px; display: block;">Displaying ${count} recipes for ${category.toLowerCase()} category</strong>`;
            }
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

// Call the function to filter recipes
window.addEventListener('DOMContentLoaded', filterRecipes);

/* when clicked on a recipe, redirect to recipePage.html with the recipe ID as a query parameter
`/recipePage.html?id=${data.recipeid}`;
*/