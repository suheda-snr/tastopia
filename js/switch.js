import { BACKEND_URL } from './config.js';
// Purpose: To switch between login and logout button and enable/disable comment input based on user login status
document.addEventListener('DOMContentLoaded', function () {
  // Make an AJAX request to the server to check if the user is logged in
  fetch(`${BACKEND_URL}/api/check-login`, {
    credentials: 'include' // If you're dealing with credentials in cross-origin requests
  })
    .then(response => response.json())
    .then(data => {
      const commentInput = document.getElementById('comment');
      const submitButton = document.querySelector('#commentForm button'); // Assuming the button is inside the form with id 'commentForm'
      if (commentInput && submitButton) {
        if (data.isLoggedIn) {
          // Enable the input and button if the user is logged in
          commentInput.disabled = false;
          submitButton.disabled = false;
          commentInput.placeholder = 'Write a comment...'; // Reset placeholder to default
        } else {
          // Disable the input and button if the user is not logged in
          commentInput.disabled = true;
          submitButton.disabled = true;
          commentInput.placeholder = 'You have to log in to rate and review'; // Show login prompt
        }
      }
      if (data.isLoggedIn) {
        document.getElementById('logout').classList.add('show');
        document.getElementById('logout').classList.remove('hide');
        document.getElementById('login').classList.add('hide');
        document.getElementById('signup').classList.add('hide');
        document.getElementsByClassName('btn  btn-orange d-block d-sm-none btn-xs')[0].classList.add('hide');

      } else {

        document.getElementById('logout').classList.add('hide');

        document.getElementById('login').classList.remove('hide');
        document.getElementById('signup').classList.remove('hide');
        document.getElementsByClassName('btn  btn-orange d-block d-sm-none btn-xs')[0].classList.remove('hide');

      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
