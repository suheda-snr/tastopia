import { BACKEND_URL } from './config.js';
// Fetch recipes associated with the logged-in user
async function fetchRecipes() {
    try {
        const response = await fetch('/api/user/recipes', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer YOUR_JWT_TOKEN', // Replace with your JWT token
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.ok) {
            displayRecipes(data.recipes);
        } else {
            console.error('Error:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Display recipes on the webpage
async function displayRecipes(recipes) {
const recipeList = document.getElementById('recipe-list');
recipeList.innerHTML = ''; // Clear previous list items
recipes.forEach(recipe => {
    const listItem = document.createElement('li');
    const deleteIcon = document.createElement('span');
    const recipeTitle = document.createElement('span');
    
    // Apply classes to elements
    deleteIcon.className = 'delete-icon';
    recipeTitle.className = 'recipe-title';
    
    // Set HTML content for delete icon
    deleteIcon.innerHTML = '<i class="bi bi-trash-fill"></i>';
    
    // Set text content for recipe title
    recipeTitle.textContent = recipe.title;
    
    // Append elements to list item
    listItem.appendChild(recipeTitle);
    listItem.appendChild(deleteIcon);
    
    // Append list item to recipe list
    recipeList.appendChild(listItem);
    
    // Apply styles
    recipeList.style.listStyleType = 'none'; // Remove list item dots
    listItem.style.color = '#EA9239'; // Set text color to orange
    deleteIcon.querySelector('i').style.color = '#EA9239'; // Set icon color to orange
    listItem.style.marginBottom = '10px'; // Add margin bottom for spacing
    deleteIcon.style.marginLeft = '30px'; // Add margin to the left of the delete icon
    recipeList.style.paddingLeft = '50px';
    
    // Add hover effect
    deleteIcon.addEventListener('mouseenter', function() {
      deleteIcon.querySelector('i').style.color = 'black'; // Change icon color to red on hover
    });
    
    deleteIcon.addEventListener('mouseleave', function() {
      deleteIcon.querySelector('i').style.color = '#EA9239'; // Change icon color back to orange when not hovered
    });
    

    // Add click event to delete icon
    deleteIcon.addEventListener('click', async () => {
        const confirmDelete = confirm('Are you sure you want to delete this recipe?');
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/recipe/${recipe.recipeid}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer YOUR_JWT_TOKEN', // Replace with your JWT token
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    // Remove the deleted recipe from the UI
                    listItem.remove();
                    console.log('Recipe deleted successfully:', data.message);
                } else {
                    console.error('Failed to delete recipe:', data.message);
                }
            } catch (error) {
                console.error('Error deleting recipe:', error);
            }
        }
    });    
 });
}
// Call fetchRecipes when the page loads
window.onload = fetchRecipes;
