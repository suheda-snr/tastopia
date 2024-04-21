import { BACKEND_URL } from './config.js'; // Adjust the path as necessary to correctly point to config.js
document.addEventListener("DOMContentLoaded", () => {
	const signupForm = document.querySelector("form");
  
	signupForm.addEventListener("submit", (event) => {
	  event.preventDefault(); // Prevent the form from submitting the traditional way
  
	  // Simple validation example
	  const email = document.getElementById("email").value;
	  const password = document.getElementById("password").value;
	  const username = document.getElementById("username").value;
	  const agreement = document.getElementById("agreement").checked;
  
	  if (!email || !password || !username || !agreement) {
		alert("Please fill out all required fields.");
		return;
	  }
  
	  // Further validation checks (email format, password criteria, etc.) can be added here
  
	  // Prepare data for submission
	  const formData = { email, password, username };
	  
	
	  fetch(`${BACKEND_URL}/register`, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	  })
	  //.then(response => response.json())
	  .then(response => {
		if (!response.ok && response.status === 401) {
		  return response.json().then(data => {
			if (data.redirectUrl) {
			alert(data.message);
			window.location.href = data.redirectUrl;
			return;
			}
			throw new Error('Unauthorized without redirect');
		  });
		}
		return response.json();
	  })
	  .then(data => {
		if(data.success) {
		  // Redirect or show success message
		 window.location.href = "/";
		 
		} else {
		  // Handle errors, display error message
		  alert(data.message);
		}
	  })
	  .catch(error => {
		console.error("Error during signup:", error);
		alert("Signup error, please try again later.");
	  });
	});
  });