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
        updateOtherRecipes(data.author.Username)
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

    if (recipeInstructions) {
        recipeInstructions.innerHTML = ''; // Clear existing content

        const stepsRegex = /(?<=\n|^)\s*\d+\.\s+/;
        
        // Check for the presence of numbered steps in a robust way
        if (stepsRegex.test(instructions)) {
            // Split the instructions into steps using a regex that accounts for numbers followed by a period and space
            const stepsArray = instructions.split(stepsRegex).filter(step => step.trim() !== '');
            stepsArray.forEach((step, index) => {
                // Since the split removes the step numbers, we manually add them back for clarity
                const paragraph = document.createElement("p");
                paragraph.textContent = `${index + 1}. ${step.trim()}`;
                paragraph.style.marginBottom = "10px";
                recipeInstructions.appendChild(paragraph);
            });
        } else { // Handle plain text without numbers
            const sentences = instructions.split(/(?<=\.)\s+/).filter(sentence => sentence.trim() !== '');
            sentences.forEach((sentence, index) => {
                const paragraph = document.createElement("p");
                let number = index + 1;
                paragraph.textContent = number + ". " +sentence.trim();
                paragraph.style.marginBottom = "10px";
                recipeInstructions.appendChild(paragraph);
            });
        }
    } else {
        console.error("Element with ID 'recipeInstructions' not found");
    }
}
function updateOtherRecipes(username) {
    const header = document.getElementById('textofuser');
    if (!header) {
        console.error("Element with ID 'textofuser' not found");
        return;
    }
    header.innerHTML = `<b>Other recipes by ${username}</b>`;
    header.parentElement.querySelector('h4').innerHTML = header.innerHTML;
}