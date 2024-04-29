// Fetch recipes associated with the logged-in user
async function fetchRecipes() {
    try {
        const response = await fetch('/api/user/recipes', {
            method: 'GET',
            headers: {
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
        listItem.classList.add('recipe-list-item');
        const deleteIcon = document.createElement('span');
        const viewIcon = document.createElement('span'); 
        const recipeTitle = document.createElement('span');
        
        // Apply classes to elements
        deleteIcon.className = 'delete-icon';
        viewIcon.className = 'view-icon'; // Add class for view icon
        recipeTitle.className = 'recipe-title';
        
        // Set HTML content for icons
        deleteIcon.innerHTML = '<i class="bi bi-trash-fill"></i>';
        viewIcon.innerHTML = '<i class="bi bi-eye-fill"></i>'; 
        
        // Set text content for recipe title
        recipeTitle.textContent = capitalizeFirstLetterEachWord(recipe.title);

        // Create container for icons
        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon-container';
        iconContainer.appendChild(viewIcon);
        iconContainer.appendChild(deleteIcon);
        
        // Append elements to list item
        listItem.appendChild(recipeTitle);
        listItem.appendChild(iconContainer);
  
        // Append list item to recipe list
        recipeList.appendChild(listItem);
        
        // Apply styles
        recipeList.style.listStyleType = 'none'; // Remove list item dots
        listItem.style.color = '#EA9239'; // Set text color to orange
        deleteIcon.querySelector('i').style.color = '#EA9239'; // Set delete icon color to orange
        viewIcon.querySelector('i').style.color = '#EA9239'; // Set view icon color to green
        listItem.style.marginBottom = '10px'; // Add margin bottom for spacing
        deleteIcon.style.marginLeft = '20px'; // Adjust margin for delete icon
        viewIcon.style.marginLeft = '60px'; // Adjust margin for view icon
        recipeList.style.paddingLeft = '50px';

        // Add hover effect for view icon
        viewIcon.addEventListener('mouseenter', function() {
          viewIcon.querySelector('i').style.color = 'black'; // Change icon color to black on hover
        });

        viewIcon.addEventListener('mouseleave', function() {
            viewIcon.querySelector('i').style.color = '#EA9239'; // Change icon color back to orange when not hovered
        });
        
        // Add hover effect for delete icon
        deleteIcon.addEventListener('mouseenter', function() {
          deleteIcon.querySelector('i').style.color = 'black'; // Change icon color to black on hover
        });
        
        deleteIcon.addEventListener('mouseleave', function() {
          deleteIcon.querySelector('i').style.color = '#EA9239'; // Change icon color back to orange when not hovered
        });

        function capitalizeFirstLetterEachWord(str) {
            return str.replace(/\b\w/g, function (char) {
                return char.toUpperCase();
            });
        }
        
        // Add click event to delete icon
        deleteIcon.addEventListener('click', async () => {
            const confirmDelete = confirm('Are you sure you want to delete this recipe?');
            if (confirmDelete) {
                try {
                    const response = await fetch(`/api/recipe/${recipe.recipeid}`, {
                        method: 'DELETE',
                        headers: {
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

        // Add click event to view icon for redirecting to recipe page
        viewIcon.addEventListener('click', () => {
            // Redirect to recipe page passing recipe ID
            window.location.href = `/recipePage.html?id=${recipe.recipeid}`;
        });
    });
}

// Call fetchRecipes when the page loads
window.onload = fetchRecipes;