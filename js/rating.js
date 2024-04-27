document.addEventListener("DOMContentLoaded", function() {
    const ratingElement = document.querySelector('#ratingStars'); // Selecting the rating element
    const stars = ratingElement.querySelectorAll('.fa-star'); // Selecting all star icons within the rating element
    const submissionMessage = document.getElementById('submission-message'); // Selecting the submission message element
    const ratingValueElement = document.getElementById('rating-value'); // Selecting the element to display the average rating

    const averageRateContainer = document.getElementById('averageRate'); // Selecting the container for the average rate stars
    const averageRateStars = averageRateContainer.querySelectorAll('.fa-star'); // Selecting all stars for average rate

    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id'); // Correctly get the recipe ID from the query parameter

    // Fetch user's last submitted rating for the recipe when the page loads
    fetch(`/api/recipe/${recipeId}/user-rating`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user rating');
        }
        return response.json(); // Parse response JSON
    })
    .then(data => {
        const userRating = data.rating;
        if (userRating) {
            const ratingValue = userRating.rating;
            if (ratingValue > 0 && ratingValue <= stars.length) {
                highlightStars(stars, ratingValue); // Highlight stars based on user's last submitted rating
            }
        }
    })
    .catch(error => {
        console.error('Error fetching user rating:', error); // Console message: Error fetching user rating
    });

    stars.forEach((star, index) => {
        star.addEventListener('click', function() { // Adding click event listener to each star
            // Make an AJAX request to the server to check if the user is logged in
            fetch('/api/check-login', {
                credentials: 'include' 
            })
            .then(response => response.json())
            .then(data => {
                if (data.isLoggedIn) {
                    const rating = index + 1; // Getting the index of the clicked star and adding 1 to make it 1-based
                    resetRating(stars); // Resetting all stars to empty
                    highlightStars(stars, rating); // Highlighting stars up to the clicked one
                    submitRating(rating); // Submitting the rating to the server
                } 
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    });

    // Fetch ratings for the recipe and display the average rating
    fetch(`/api/recipe/${recipeId}/ratings`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch ratings for the recipe');
        }
        return response.json(); // Parse response JSON
    })
    .then(data => {
        const ratings = data.ratings;
        const totalRatings = ratings.length; // Get the total number of ratings
        if (ratings && totalRatings > 0) {
            const averageRating = calculateAverageRating(ratings); // Calculate average rating
            displayAverageRating(averageRating, totalRatings); // Display average rating with total users count
            fillAverageRateStars(averageRating); // Fill average rate stars
            
            // Add event listener to display rating counts on hover
            ratingValueElement.addEventListener('mouseover', function() {
                displayRatingCounts(ratings);
            });

            // Remove the box when mouse leaves the average rating element
            ratingValueElement.addEventListener('mouseout', function() {
                const container = document.querySelector('#rating-counts-container');
                if (container) {
                    container.parentNode.removeChild(container);
                }
            });
        } else {
            // If no ratings, display "(0)"
            ratingValueElement.textContent = "(0)";
        }
    })
    .catch(error => {
        console.error('Error fetching ratings:', error);
    });

    // Function to calculate the average rating
    function calculateAverageRating(ratings) {
        const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
        return totalRating / ratings.length; // Calculate average rating
    }

    // Function to display the average rating and rating count
    function displayAverageRating(averageRating, totalRatings) {
        ratingValueElement.innerHTML = `
            <span style="font-size: 1.1em;">
                <span style="color: black; text-decoration: underline;">${averageRating.toFixed(1)}</span>
            </span>
            <span style="color: gray; font-size: 0.9em;">(${totalRatings})</span>
        `;
    }

  // Function to fill the average rate stars based on the average rating
function fillAverageRateStars(averageRating) {
    const filledStars = Math.floor(averageRating); // Round down the average rating
    const halfStar = averageRating - filledStars >= 0.5; // Check if there's a half star
    resetRating(averageRateStars); // Reset all stars
    
    // Fill stars up to the rounded down average rating
    highlightStars(averageRateStars, filledStars);

    // If there's a half star, fill the next star with half
    if (halfStar && filledStars < averageRateStars.length) {
        averageRateStars[filledStars].classList.remove('far'); // Removing the empty star class
        averageRateStars[filledStars].classList.add('fa'); // Adding the filled star class
        averageRateStars[filledStars].classList.add('fa-star-half-o'); // Adding half-filled star class
    }
}


    // Function to reset the rating stars
    function resetRating(stars) {
        stars.forEach(star => {
            star.classList.remove('fas'); // Removing the filled star class
            star.classList.add('far'); // Adding the empty star class
        });
    }

    // Function to highlight the rating stars up to the selected star
    function highlightStars(stars, rating) {
        for (let i = 0; i < rating; i++) {
            stars[i].classList.remove('far'); // Removing the empty star class
            stars[i].classList.add('fa'); // Adding the filled star class
        }
    }

    // Function to submit the rating to the server
    function submitRating(rating) {
        // Make a POST request to submit or update the rating to the server
        fetch(`/recipe/${recipeId}/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating: rating })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit rating');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message); // Console message: Message received from the server
            submissionMessage.textContent = data.message; // Display message from the server
            submissionMessage.style.color = 'green'; // Set text color to green
            setTimeout(() => {
                submissionMessage.textContent = ''; // Clear message after 1.5 seconds
                // Refresh the page after successful submission
                window.location.reload();
            }, 1500);
        })        
        .catch(error => {
            console.error('Error submitting rating:', error); // Console message: Error submitting rating
            submissionMessage.textContent = 'Failed to submit rating'; // Display error message
            submissionMessage.style.color = 'red'; // Set text color to red
        });
    }

// Function to display rating counts for each rating
function displayRatingCounts(ratings) {
    const ratingCounts = [0, 0, 0, 0, 0]; // Initialize array to store counts for each rating
    ratings.forEach(rating => {
        ratingCounts[rating.rating - 1]++; // Increment count for corresponding rating
    });

    // Create a container to hold the star icons and rating counts
    const container = document.createElement('div');
    container.id = 'rating-counts-container'; // Set id for easy removal
    container.style.position = 'fixed';
    container.style.zIndex = '9999';
    container.style.background = 'white';
    container.style.border = '1px solid #EA9239';
    container.style.borderRadius = '5px';
    container.style.padding = '10px';
    
    // Append the container to the document body
    document.body.appendChild(container);

    // Update container position based on mouse movement
    document.addEventListener('mousemove', function(e) {
        container.style.left = e.pageX + 'px';
        container.style.top = e.pageY + 'px';
    });

    // Display average rating out of five
    const averageRating = calculateAverageRating(ratings);
    const averageRatingText = document.createElement('div');
    averageRatingText.textContent = `${averageRating.toFixed(1)} out of 5`;
    averageRatingText.style.fontWeight = 'bold';
    container.appendChild(averageRatingText);

    // Add space after "out of 5"
    const spaceAfterRating = document.createElement('div');
    spaceAfterRating.style.marginBottom = '5px';
    container.appendChild(spaceAfterRating);

    // Display stars and rating counts
    for (let i = ratingCounts.length - 1; i >= 0; i--) {
        const ratingCount = ratingCounts[i];
        const starContainer = document.createElement('div');
        
        // Add star icons for the star count
        const starIcons = '&#9733;'.repeat(i + 1); // Unicode star character
        const starText = document.createElement('span');
        starText.innerHTML = starIcons;
        starText.style.color = '#EA9239'; 
        starContainer.appendChild(starText);

        // Add space before the rating count
        starContainer.appendChild(document.createTextNode(' '));

        // Add rating count in black color
        const countText = document.createElement('span');
        countText.textContent = `: ${ratingCount}`;
        countText.style.color = 'black'; // Make the text black
        starContainer.appendChild(countText);

        // Add space after the rating count
        starContainer.appendChild(document.createTextNode(' '));

        container.appendChild(starContainer);
    }

    // Add space before "Total Ratings"
    const spaceBeforeTotal = document.createElement('div');
    spaceBeforeTotal.style.marginTop = '10px';
    container.appendChild(spaceBeforeTotal);

    // Display total rating count in smaller grey text
    const totalRatingCount = ratings.length;
    const totalRatingText = document.createElement('div');
    totalRatingText.textContent = `${totalRatingCount} Ratings`;
    totalRatingText.style.color = 'grey'; // Set text color to grey
    totalRatingText.style.fontSize = '0.9em'; // Set font size to smaller
    container.appendChild(totalRatingText);
}
});