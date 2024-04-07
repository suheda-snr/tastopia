//display error message when the search input is empty
const displayErrorMessage = (message) => {
    // Get the error box and display the error message
    const errorBox = document.querySelector('.error-box');
    errorBox.innerHTML = message;
    // Style the search box to indicate an error
    const searchInput = document.querySelector('.search-bar'); 
    searchInput.style.borderColor = "#EA9239"; 
};

// Get the search input and search button
const searchInput = document.querySelector('.search-bar'); // Assuming the search input has the class 'search-bar'
const searchButton = document.querySelector('.btn-search'); // Assuming the search button has the class 'btn-search'

// Add an event listener to the search button
searchButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    // Get the search input value
    const input = searchInput.value.trim();
    // Check if the search input is empty
    if (input !== "") {
        // Perform search
        console.log("Performing search for:", input);
        // Clear the search input
        searchInput.value = '';
        // Set focus back to the search input
        searchInput.focus();
    } else {
        // Display error message
        displayErrorMessage('Please, fill out this field');
    }
});

// Add an event listener to the search input
searchInput.addEventListener('input', () => {
    const searchedText = searchInput.value.trim();
    if (searchedText !== "") {
        // Clear the error box content when there is input in the search field
        const errorBox = document.querySelector('.error-box');
        errorBox.innerHTML = ''; // Clear the error box content
        errorBox.style = '';
    }
});


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
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
