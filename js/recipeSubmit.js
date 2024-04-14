import { BACKEND_URL } from './config.js';
document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData(this);
    fetch(`${BACKEND_URL}/recipe`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success && data.recipeId) {
            window.location.href = `/recipe/${data.recipeId}`; // Redirect to the new recipe page
        } else {
            // Handle errors or show messages
            console.error('Failed to create recipe:', data.message);
        }
    })
    .catch(error => console.error('Error submitting recipe:', error));
});