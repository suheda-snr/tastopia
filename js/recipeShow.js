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
        //console.log(data)
        updateRecipeTitle(data.title)
        updateUsername(data.author.Username)
        updateRecipeImage(data.picture)
        updateRecipeDescription(data.description)
        updateRecipePrepTime(data.preptime)
        updateRecipeIngridients(data.ingredients)
        updateRecipeInstructions(data.instructions)
    })
    .catch(error => {
        console.error('Error fetching recipe:', error); // Console message: Error fetching recipe
    });
});

function updateRecipeTitle (title) {
    const recipeTitle = document.getElementById('recipeTitle');  //Title header
    if(recipeTitle) {
        recipeTitle.textContent = title
    }
    else {
        console.error("Element with ID 'recipeTitle' not found");
    }
}

function updateUsername (username) {
    const userName = document.getElementById('userName');  //USername
    if(userName) {
        userName.textContent = username;
    }
    else {
        console.error("Element with ID 'userName' not found");
    }
}

function updateRecipeImage (imageurl) {
    const recipeImage = document.getElementById('recipeImage');  //Image
    if(recipeImage) {
        recipeImage.setAttribute("src", imageurl)
    }
    else {
        console.error("Element with ID 'recipeImage' not found");
    }
    
}

function updateRecipeDescription (description) {
    const recipeDescription = document.getElementById('recipeDescription');  //Description
    if(recipeDescription) {
        recipeDescription.textContent = description
    }
    else {
        console.error("Element with ID 'recipeDescription' not found");
    }
}

function updateRecipePrepTime (preptime) {
    const recipePrepTime = document.getElementById('prepTime');  //PrepTime
    if(recipePrepTime) {
        recipePrepTime.innerHTML = `<i class="bi bi-clock-fill" style="color: #EA9239; font-size: 17px; margin-right: 5px;"></i> ${preptime} minutes`;
    }
    else {
        console.error("Element with ID 'recipePrepTime' not found");
    }
}

function updateRecipeIngridients (ingridients) {
    const recipeIngredients = document.getElementById('recipeIngredients');  //Ingridients

    // Check if the <ol> element is found
    if (recipeIngredients) {
        // Clear existing <li> items from the <ol> element
        recipeIngredients.innerHTML = '';

        // Split the ingredients string into individual items based on comma and trim whitespace
        const ingredientsArray = ingridients.split(",").map(item => item.trim());

        // Iterate over the ingredients array and add each item as a <li> (list item) to the <ol> element
        ingredientsArray.forEach(ingredient => {
            // Create a new <li> element
            const listItem = document.createElement("li");

            // Set the text content of the <li> element to the ingredient item
            listItem.textContent = ingredient;

            // Append the <li> element to the <ol> (ordered list) element
            recipeIngredients.appendChild(listItem);
        });
    } else {
        console.error("Element with ID 'recipeIngredients' not found");
    }
}

function updateRecipeInstructions (instructions) {
    const recipeInstructions = document.getElementById('recipeInstructions');  //Instructions

    // Check if the <ol> element is found
    if (recipeInstructions) {
        // Clear existing <li> items from the <ol> element
        recipeInstructions.innerHTML = '';

        // Split the cooking instructions into individual steps based on the numbering pattern
        const ingstructionsArray = instructions.split(/\d+\./).filter(step => step.trim() !== '');

        // Iterate over the ingredients array and add each item as a <li> (list item) to the <ol> element
        ingstructionsArray.forEach(instruction => {
            // Create a new <li> element
            const listItem = document.createElement("li");

            // Set the text content of the <li> element to the ingredient item
            listItem.textContent = instruction;

            // Apply inline styles to the <li> element
            listItem.style.marginBottom = "5px";

            // Append the <li> element to the <ol> (ordered list) element
            recipeInstructions.appendChild(listItem);
        });
    } else {
        console.error("Element with ID 'recipeInstructions' not found");
    }
}