document.addEventListener('DOMContentLoaded', function() {
// Make an AJAX request to the server to check if the user is logged in
fetch('http://localhost:3001/api/check-login', {
	credentials: 'include' // If you're dealing with credentials in cross-origin requests
  })
 .then(response => response.json())
 .then(data => {
	const commentInput = document.getElementById('comment'); 
	const submitButton = document.querySelector('#commentForm button'); // Assuming the button is inside the form with id 'commentForm'
   if (data.isLoggedIn) {
  document.getElementById('logout').classList.add('show');
  document.getElementById('logout').classList.remove('hide');
  document.getElementById('login').classList.add('hide');
  document.getElementById('signup').classList.add('hide');
  document.getElementsByClassName('btn  btn-orange d-block d-sm-none btn-xs')[0].classList.add('hide');
   // Enable the comment form
   commentInput.disabled = false;
   commentInput.placeholder = 'Write a comment...'; // Default placeholder
   submitButton.disabled = false; // Enable submit button if needed
   } else {
	
	 document.getElementById('logout').classList.add('hide');

	 document.getElementById('login').classList.remove('hide');
	 document.getElementById('signup').classList.remove('hide');
	 document.getElementsByClassName('btn  btn-orange d-block d-sm-none btn-xs')[0].classList.remove('hide');
	 // Disable the comment form
	 commentInput.disabled = true;
	 commentInput.placeholder = 'You have to log in to comment'; // Placeholder when logged out
	 submitButton.disabled = true; // Disable submit button
   }
 })
 .catch(error => {
   console.error('Error:', error);
 });
});