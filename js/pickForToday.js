import { Recipes } from './class/Recipes.js';

// Wait for the DOM content to load before executing the code
window.addEventListener('DOMContentLoaded', () => { 
    // Get the random recipe button
    document.getElementById("pickForToday").addEventListener("click", function() {
        // Create a new instance of the Recipes class
        const recipe = new Recipes();
        // Call the getRecipes method to get all recipes
        recipe.getRecipes()
            .then(recipes => {
                // Get a random recipe from the recipes array
                const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
                // Redirect to the recipe page with the random recipe ID
                window.location.href = `recipePage.html?id=${randomRecipe.id}`;
            })
            // Log any errors to the console
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    });
});