// Assuming BACKEND_URL is defined and points to your backend server
import { BACKEND_URL } from './config.js';

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");
  
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way
  
        // Capture login details
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        // Prepare data for submission
        const formData = { email, password };
  
        // Send an AJAX request for logging in
        fetch(`${BACKEND_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
			//credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Redirect or show success message
                window.location.href = "/";
                
            } else {
                // Handle errors, display error message
                alert(data.message || "Your email or password is not correct");
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
            alert( "Your email or password is not correct, please try again.");
        });
    });
});
