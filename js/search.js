import { BACKEND_URL } from "./config.js";
import { Recipes } from './class/Recipes.js';

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
            searchResultsContainer.innerHTML = '';
            let count = 0; // Initialize count for results
            recipes.forEach(recipe => {
                if (recipe.title.toLowerCase().includes(input.toLowerCase())) {
                    const card = document.createElement('div');
                    card.classList.add('col');
                    card.innerHTML = `
                        <div class="card h-100">
                            <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title}</h5>
                            </div>
                        </div>
                    `;
                    searchResultsContainer.appendChild(card);
                    count++; // Increment count for each matching result
                }
            });

            // Update displayText with appropriate message
            if (count > 0) {
                displayText.innerHTML = `<strong style="text-align: center; font-size: 23px; display: block;">Displaying ${count} results for your search keyword: "${input}"</strong>`;
            } else {
                displayText.innerHTML = `
                    <strong style="text-align: center; font-size: 23px; display: block;">Oops! We couldn't find any matches for your search: "${input}"</strong>
                    <img src="../images/potato.jpg" alt="No Results Found" style="display: block; margin: 90px auto; max-width: 13%;">`;
            }
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

// Call filterRecipes when the page loads
window.addEventListener('DOMContentLoaded', filterRecipes);