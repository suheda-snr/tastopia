// Rendering html elements

// Define a function to create and render a card element for search results
function searchResultsCard(recipe) {
    const card = document.createElement('div');
    card.classList.add('col');
    card.innerHTML = `
            <div class="row justify-content-center" id="cardRow1">
                <div class="card h-100">
                     <img src="${recipe.picture}" class="card-img-top" alt="${recipe.title}" style="height: 200px;">
                    <div class="card-body">
                        <h5 class="card-title no-underline" style="height: 50px;">${recipe.title}</h5>
                        <p class="card-text">by ${recipe.username}</p>
                    </div>
                </div>
            </div>
        </a>
    `;
    return card;
}

function categoryResultsCard(recipe) {
    const card = document.createElement('div');
    card.classList.add('col');
    card.innerHTML = `
            <div class="row justify-content-center" id="cardRow1">
                <div class="card h-100">
                    <img src="${recipe.picture}" class="card-img-top" alt="${recipe.title}" style="height: 200px;">
                    <div class="card-body">
                        <h5 class="card-title no-underline" style="height: 50px;">${recipe.title} </h5>
                        <p class="card-text">by ${recipe.username}</p>
                    </div>
                </div>
            </div>
        </a>
    `;
    return card;
}

  
  // Export the searchResultsCard function to be used in other modules
  export { searchResultsCard, categoryResultsCard };
