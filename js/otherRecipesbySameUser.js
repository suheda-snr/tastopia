import { otherRecipesbyCards } from './renderedElements.js';

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id'); // Correctly get the recipe ID from the query parameter

    // Fetch user's last submitted rating for the recipe when the page loads
    fetch(`/api/recipe/${recipeId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch recipe');
        }
        return response.json(); // Parse response JSON
    })
    .then(data => {
        const userId = data.userid; // Extract the user ID from the response data
        console.log(userId); // Log the user ID

        // Fetch other recipes from the same user
        fetch(`/api/user/${userId}/recipes`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user recipes');
            }
            return response.json(); // Parse response JSON
        })
        .then(recipes => {
            console.log(`Recipe id: ${recipeId}`); 
            console.log("Recipes:", recipes);
            
            // Filter out the current recipe based on its ID
            const filteredRecipes = recipes.filter(recipe => recipe.recipeid !== parseInt(recipeId));
            
            // Make debugging easier
            console.log("Filtered Recipes:", filteredRecipes);
            
            // Display other recipes from the same user
            displayOtherRecipes(filteredRecipes, recipeId); 
            
        })
        .catch(error => {
            console.error('Error fetching user recipes:', error);
        });
    })
    .catch(error => {
        console.error('Error fetching recipe:', error);
    });
});

function displayOtherRecipes(recipes, recipeId) {
    const otherRecipesContainer = document.getElementById('other-recipes');

    otherRecipesContainer.innerHTML = '';

    if (Array.isArray(recipes) && recipes.length > 0) {
        // Sort recipes alphabetically by title
        recipes.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
        });

        recipes.forEach(recipe => {
            const card = otherRecipesbyCards(recipe);
            card.addEventListener('click', () => {
                // Redirect to recipePage.html with the recipe ID as a query parameter
                window.location.href = `recipePage.html?id=${recipe.recipeid}`;
            });
            otherRecipesContainer.appendChild(card);
        });
    } else {
        const message = document.createElement('p');
        message.textContent = 'User has not shared any other recipes.';
        message.classList.add('text-center', 'text-lg-left'); // Center align on small devices, left align on large devices
        otherRecipesContainer.appendChild(message);
    }
}