document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('#shareNewRecipe, #myRecipes');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Stop the link from navigating immediately
            fetch('/api/check-login')
                .then(response => response.json())
                .then(data => {
                    if (data.isLoggedIn) {
                        window.location.href = link.href; // Navigate to the link if logged in
                    } else {
                        alert("Please login to share your recipes");
                    }
                })
                .catch(() => {
                    alert("Error checking login status");
                });
        });
    });
});
