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

// Function to calculate average rating
function calculateAverage(ratings) {
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  if (sum === 0) {
    return ""; // Return an empty string if the sum is zero
  }
  return (sum / ratings.length).toFixed(1); // Round to 1 decimal place
}


// Function to generate Bootstrap stars based on average rating
function generateStars(averageRating) {
  if (isNaN(averageRating)) {
      // If averageRating is NaN (which means there are no ratings), return empty stars
      return '<i class="bi bi-star" style="color: #EA9239;"></i>'.repeat(5);
  }

  const fullStars = Math.floor(averageRating);
  const halfStar = averageRating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  let starsHTML = '';
  for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="bi bi-star-fill" style="color: #EA9239;"></i>';
  }
  if (halfStar) {
      starsHTML += '<i class="bi bi-star-half" style="color: #EA9239;"></i>';
  }
  for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i class="bi bi-star" style="color: #EA9239;"></i>';
  }
  return starsHTML;
}


  // Owl Carousel for most beloved recipes
// Fetch all recipes with their ratings from the server
fetch('/api/recipes-with-ratings')
.then(response => response.json()) // Parse response as JSON
.then(recipesWithRatings => {
    // Sort recipes based on average ratings
    recipesWithRatings.sort((a, b) => calculateAverage(b.ratings) - calculateAverage(a.ratings));

    // Select the top 10 recipes
    const topRecipes = recipesWithRatings.slice(0, 10);

    // Find the carousel element
    const carousel = document.querySelector('#mostBelovedRecipes');

    // Filter the topRecipes array to include only recipes with an average rating of 4 or higher
    const topRecipesFiltered = topRecipes.filter(recipe => {
        return calculateAverage(recipe.ratings) >= 4;
    });

    // Iterate over each top recipe with ratings and add it to the carousel
// Iterate over each top recipe with ratings and add it to the carousel
topRecipesFiltered.forEach(recipe => {
  if (recipe.ratings.length > 0) { // Only add recipes with ratings
      const averageRating = calculateAverage(recipe.ratings);
      const numRatings = recipe.ratings.length;
      const carouselItem = document.createElement('div');

      // Function to capitalize initials of words
      function capitalizeInitials(str) {
          return str.replace(/\b\w/g, function(char) {
              return char.toUpperCase();
          });
      }

      // Create HTML for carousel item
      carouselItem.innerHTML = `
      <div class="media media-custom d-block text-left" style="width: 340px;"> <!-- Adjust width as needed -->
          <a href="recipePage.html?id=${recipe.id}"> <!-- Redirect to recipePage.html with recipe id -->
              <img src="${recipe.image}" alt="${recipe.title}" class="img-fluid" style="margin-bottom: 6px; height:230px;"> <!-- Adjust margin-bottom value to increase or decrease the space -->
          </a>
          <div class="media-body">
              <h3 class="text-black mt-0" style="text-align: left; color: #EA9239 !important;font-size: 24px; margin-bottom: 2px;"> <!-- Adjust font-size and margin-bottom values -->
                  ${capitalizeInitials(recipe.title)}
              </h3>
              <p style="text-align: left; font-size: 12px; margin-bottom: 10px;">by ${recipe.username}</p> <!-- Adjust font-size and margin-bottom values -->
              <div class="stars-container" style="margin-top: -3px;"> <!-- Adjust margin-top value to adjust spacing -->
                  ${generateStars(averageRating)} <span class="average-rating" style="font-size: 16px; padding-left:3px;">${averageRating}</span> <span style="font-size: 13px; color: grey;">(${numRatings})</span>
              </div>
          </div>
      </div>
      `;

      // Add click event listener to redirect to recipePage.html with recipe id
      carouselItem.addEventListener('click', () => {
          window.location.href = `recipePage.html?id=${recipe.id}`;
      });

      // Append the carousel item to the carousel
      carousel.appendChild(carouselItem);
  }
});


    // Initialize Owl Carousel after adding items
    $('#mostBelovedRecipes').owlCarousel({
        loop: true,
        stagePadding: 7,
        margin: 20,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        nav: true,
        autoplayHoverPause: true,
        items: 3,
        autoplaySpeed: 100,
        navText: ["<span class='fa fa-chevron-left'></span>", "<span class='fa fa-chevron-right'></span>"],
        responsive: {
            0:{
                items: 1,
                nav: false, // Hide navigation buttons on small devices
                autoplay: true, // Autoplay on small devices
            },
            600:{
                items: 2,
                nav: false // Hide navigation buttons on medium devices
            },
            1000:{
                items: 3,
                nav: true // Show navigation buttons on large devices
            }
        }
    });
})
.catch(error => {
    console.error('Error:', error); // Log any errors to the console
});



  // Owl Carousel for you might also like
// Make a GET request to fetch 6 random recipes with their ratings
fetch('/api/recipes-with-ratings')
  .then(response => response.json()) // Parse response as JSON
  .then(recipesRandom => {

    // Get random 6 recipes
    const recipesRandom6 = recipesRandom.sort(() => 0.5 - Math.random()).slice(0, 6);
    const youMightAlsoLikeCarousel = document.getElementById('youMightAlsoLike');
    console.log(recipesRandom6); 

    // Call displayRecipes function passing the random recipes array
    displayRecipes(recipesRandom6);

    // Function to display recipes
function displayRecipes(recipes) {
  recipes.forEach(recipe => {
    const averageRating = calculateAverage(recipe.ratings);
    const numRatings = recipe.ratings.length;
    const carouselItem2 = document.createElement('div');
    // Function to capitalize initials of words
    function capitalizeInitials(str) {
      return str.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
      });
    }
    carouselItem2.innerHTML = `
    <div class="media media-custom d-block text-left" style="width: 340px;"> <!-- Adjust width as needed -->
        <a href="recipePage.html?id=${recipe.id}"> <!-- Redirect to recipePage.html with recipe id -->
            <img src="${recipe.image}" alt="${recipe.title}" class="img-fluid" style="margin-bottom: 6px; height:230px;"> <!-- Adjust margin-bottom value to increase or decrease the space -->
        </a>
        <div class="media-body">
            <h3 class="text-black mt-0" style="text-align: left; color: #EA9239 !important;font-size: 24px; margin-bottom: 2px;"> <!-- Adjust font-size and margin-bottom values -->
                ${capitalizeInitials(recipe.title)}
            </h3>
            <p style="text-align: left; font-size: 12px; margin-bottom: 10px;">by ${recipe.username}</p> <!-- Adjust font-size and margin-bottom values -->
            <div class="stars-container" style="margin-top: -3px;"> <!-- Adjust margin-top value to adjust spacing -->
                ${generateStars(averageRating)} <span class="average-rating" style="font-size: 16px; padding-left:3px;">${averageRating}</span> <span style="font-size: 13px; color: grey;">(${numRatings})</span>
            </div>
        </div>
    </div>
`;
    youMightAlsoLikeCarousel.appendChild(carouselItem2);
  });

  // Initialize Owl Carousel after adding items
  $('#youMightAlsoLike').owlCarousel({
    loop: true,
    stagePadding: 7,
    margin: 20,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    autoplayHoverPause: true,
    items: 3,
    autoplaySpeed: 100,
    navText: ["<span class='fa fa-chevron-left'></span>", "<span class='fa fa-chevron-right'></span>"],
        responsive: {
            0:{
                items: 1,
                nav: false, // Hide navigation buttons on small devices
                autoplay: true, // Autoplay on small devices
            },
            600:{
                items: 2,
                nav: false // Hide navigation buttons on medium devices
            },
            1000:{
                items: 3,
                nav: true // Show navigation buttons on large devices
            }
        }
    });
  }
})
.catch(error => {
    console.error('Error:', error); // Log any errors to the console
});