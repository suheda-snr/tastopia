import { BACKEND_URL } from "./config.js";
import { Recipes } from './class/Recipes.js';
import { categoryResultsCard } from "./renderedElements.js";

// Function to render category recipes
function renderCategoryRecipes(recipes) {
    const categoryResultsContainer = document.getElementById('category-results');
    categoryResultsContainer.innerHTML = ''; // Clear previous results

    recipes.forEach(recipe => {
        const card = categoryResultsCard(recipe);
        categoryResultsContainer.appendChild(card);
    });
}

// Add click event to dropdown items in Recipes section
document.addEventListener('DOMContentLoaded', function () {
    const dropdownItems = document.querySelectorAll('.navbar .dropdown-menu a.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', event => {
            console.log('Clicked:', item.textContent);
            const category = item.textContent;
            console.log(' Displaying recipes for category:', category);

            const recipe = new Recipes();
            recipe.getRecipes()
                .then(recipes => {
                    const categoryRecipes = recipes.filter(recipe => recipe.category.toLowerCase() === category.toLowerCase());
                    renderCategoryRecipes(categoryRecipes);
                })
                .catch(error => {
                    console.error('Error fetching recipes:', error);
                });

            // Redirect to categories.html after clicking on a dropdown item
            window.location.href = 'categoryResults.html';
        });
    });
}); 

// Export the categoryResultsCard function to be used in other modules
export { categoryResultsCard };



/*
// Function to render category recipes
function renderCategoryRecipes(recipes) {
    const container = document.getElementById('category-results');
    container.innerHTML = ''; // Clear previous content
    
    recipes.forEach(recipe => {
        const card = categoryResultsCard(recipe);
        container.appendChild(card);
    });
}
*/
