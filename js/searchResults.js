import { Recipes } from './class/Recipes.js';
// Import the createCard function from index.js
import { searchResultsCard } from './renderedElements.js';


const searchInput = document.querySelector('.search-bar');
const searchButton = document.querySelector('.btn-search');

const displayErrorMessage = (message) => {
    const errorBox = document.querySelector('.error-box');
    errorBox.innerHTML = message;
    const searchInput = document.querySelector('.search-bar'); 
    searchInput.style.borderColor = "#EA9239"; 
};

const clearErrorMessage = () => {
    const errorBox = document.querySelector('.error-box');
    errorBox.innerHTML = '';
};

searchButton.addEventListener('click', (event) => {
    event.preventDefault(); 
    const input = searchInput.value.trim();
    if (input === "") {
        displayErrorMessage('Please fill out this field');
        console.log("Please fill out this field");
    } else {
        // Redirect to searchresults.html with input value as query parameter
        window.location.href = `searchresults.html?query=${encodeURIComponent(input)}`;
    } 
});

searchInput.addEventListener('input', () => {
    const searchedText = searchInput.value.trim();
    if (searchedText !== "") {
        clearErrorMessage();
    }
});

// Filter recipes based on query parameter in URL
function filterRecipes() {
    const urlParams = new URLSearchParams(window.location.search);
    const input = urlParams.get('query');
    if (!input) return;

    const recipesInstance = new Recipes();
    const searchResultsContainer = document.querySelector('#search-results');
    const displayText = document.querySelector('#displayText');

    recipesInstance.getRecipes()
        .then(recipes => {
            // Sort recipes alphabetically by title
            recipes.sort((a, b) => a.title.localeCompare(b.title));

            searchResultsContainer.innerHTML = '';
            let count = 0; // Initialize count for results
            recipes.forEach(recipe => {
                // Check if the input matches the recipe title or any of the ingredients
                if (recipe.title.toLowerCase().includes(input.toLowerCase()) || recipe.ingredients.toLowerCase().includes(input.toLowerCase())) {
                    // Create the card element using the imported function
                    const card = searchResultsCard(recipe);
                    // Add event listener to redirect to new page with recipe ID
                    card.addEventListener('click', () => {
                        window.location.href = `recipePage.html?id=${recipe.id}`;
                    });
                    searchResultsContainer.appendChild(card);
                    count++; // Increment count for each matching result
                }
            });

            // Update displayText with appropriate message
            if (count > 0) {
                displayText.innerHTML = `<strong style="text-align: center; font-size: 22px; display: block;">Displaying ${count} results for your search keyword: "${input}"</strong>`;
            } else {
                displayText.innerHTML = `
                    <strong style="text-align: center; font-size: 22px; display: block;">Oops! We couldn't find any matches for your search: "${input}"</strong>
                    <img src="../images/potato.jpg" alt="No Results Found" style="display: block; margin: 70px auto; width:150px; height: auto;"/>`;
            }
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

// Call filterRecipes when the page loads
window.addEventListener('DOMContentLoaded', filterRecipes);
