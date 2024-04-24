import { Recipes } from './class/Recipes.js';
import { allRecipesCard } from "./renderedElements.js";
document.addEventListener('DOMContentLoaded', () => {
    // Ensure DOM content is loaded before accessing elements
    const slideshowContainer = document.getElementById('slideshow-container');

    // Check if slideshowContainer exists before adding event listener
    if (slideshowContainer) {
        slideshowContainer.addEventListener('click', () => {
            // Redirect to the new page to display all recipes
            window.location.href = 'allRecipes.html';
        });
    }

    const recipe = new Recipes();

    recipe.getRecipes()
        .then(recipes => {
            const allRecipesContainer = document.getElementById('all-recipes');
            allRecipesContainer.innerHTML = ''; // Clear previous results
            let count = 0; // Initialize count for results
            recipes.forEach(recipe => {
                const card = allRecipesCard(recipe); // Assuming allRecipesCard is a function to create a recipe card
                // Add event listener to redirect to new page with recipe ID
                card.addEventListener('click', () => {
                    window.location.href = `recipePage.html?id=${recipe.id}`;
                });
                allRecipesContainer.appendChild(card);
                count++;
            });

            // Display message based on the number of results
            const displayText = document.getElementById('display-text');
            if (count === 0) {
                displayText.innerHTML = `
                    <strong style="text-align: center; font-size: 22px; display: block;">Oops! We couldn't find any results</strong>
                    <img src="../images/potato.jpg" alt="No Results Found" style="display: block; margin: 70px auto; width:150px; height: auto;"/>`;
            } else {
                displayText.innerHTML = `<strong style="text-align: center; font-size: 22px; display: block;">Displaying ${count} recipes</strong>`;
            }
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });

});
