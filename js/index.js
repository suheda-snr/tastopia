var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 3000); // Change image every 3 seconds
}


// Owl carousel image media section
$('.js-carousel').owlCarousel({
  loop: true,
 autoplay: true,
  stagePAdding:  7,
  margin:20,
  animateOut:'fadeOut',
  animateIn:'fadeIn',
  nav: true,
  autoPlayHoverPause: true,
  items: 3,
  navText: ["<span class='fa fa-chevron-left'></span>", "<span class='fa fa-chevron-right'></span>"],
  /*responsive: {
    0:{
      items:1,
      nav:false,
    },
    600:{
      items:2,
      nav:false,
    },
    1000:{
      items:1,
      nav:true,
      loop:false
    }
  }*/
});

// Recipe sharing category button
document.addEventListener('DOMContentLoaded', function() {
    var categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                categoryBtns.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
});


// call for my recipes //
// Sample data - replace this with actual data from your server
const recipes = [
    { name: "Recipe A", id: 1 },
    { name: "Recipe B", id: 2 },
    { name: "Recipe C", id: 3 }
  ];
  
  const recipeList = document.getElementById("recipe-list");
  
  // Function to render the recipe list
  function renderRecipeList() {
    recipeList.innerHTML = "";
    recipes.forEach((recipe, index) => {
      const listItem = document.createElement("li");
      listItem.className = "recipe-item";
  
      const recipeName = document.createElement("span");
      recipeName.className = "recipe-name";
      const recipeLink = document.createElement("a");
      recipeLink.textContent = recipe.name;
      recipeLink.href = `/recipe/${recipe.id}`; // Assuming the URL structure
      recipeName.appendChild(recipeLink);
      listItem.appendChild(recipeName);
  
      const actionsContainer = document.createElement("div");
      actionsContainer.className = "recipe-actions";
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteRecipe(index));
      actionsContainer.appendChild(deleteButton);
  
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => editRecipe(index));
      actionsContainer.appendChild(editButton);
  
      listItem.appendChild(actionsContainer);
  
      recipeList.appendChild(listItem);
    });
  }
  
  // Function to delete a recipe
  function deleteRecipe(index) {
    recipes.splice(index, 1);
    renderRecipeList();
  }
  
  // Function to edit a recipe
  function editRecipe(index) {
    // Placeholder for edit functionality
    console.log("Editing recipe at index", index);
  }
  
  // Initial rendering of the recipe list
  renderRecipeList();

  // Sample data - replace this with actual data from your server
const savedRecipes = [
    { name: "Saved Recipe X", id: 4 },
    { name: "Saved Recipe Y", id: 5 },
    { name: "Saved Recipe Z", id: 6 }
  ];
  
  const savedRecipeList = document.getElementById("saved-recipe-list");
  
  // Function to render the saved recipe list
  function renderSavedRecipeList() {
    savedRecipeList.innerHTML = "";
    savedRecipes.forEach((recipe, index) => {
      const listItem = document.createElement("li");
      listItem.className = "saved-recipe-item";
  
      const recipeName = document.createElement("span");
      recipeName.className = "saved-recipe-name";
      const recipeLink = document.createElement("a");
      recipeLink.textContent = recipe.name;
      recipeLink.href = `/recipe/${recipe.id}`; // Assuming the URL structure
      recipeName.appendChild(recipeLink);
      listItem.appendChild(recipeName);
  
      const unsaveButton = document.createElement("button");
      unsaveButton.textContent = "Unsave";
      unsaveButton.addEventListener("click", () => unsaveRecipe(index));
      listItem.appendChild(unsaveButton);
  
      savedRecipeList.appendChild(listItem);
    });
  }
  
  // Function to unsave a recipe
  function unsaveRecipe(index) {
    savedRecipes.splice(index, 1);
    renderSavedRecipeList();
  }
  
  // Initial rendering of the saved recipe list
  renderSavedRecipeList();
  