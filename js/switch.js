document.addEventListener('DOMContentLoaded', function() {
// Make an AJAX request to the server to check if the user is logged in
fetch('http://localhost:3001/api/check-login', {
	credentials: 'include' // If you're dealing with credentials in cross-origin requests
  })
 .then(response => response.json())
 .then(data => {
   if (data.isLoggedIn) {
	/*document.getElementById('login').style.display = 'none';
	document.getElementById('signup').style.display = 'none';
	document.getElementById('logout').style.display = 'block';*/
  document.getElementById('logout').classList.add('show');
  document.getElementById('logout').classList.remove('hide');
  document.getElementById('login').classList.add('hide');
  document.getElementById('signup').classList.add('hide');
  document.getElementsByClassName('btn  btn-orange d-block d-sm-none btn-xs')[0].classList.add('hide');
   } else {
	/*
	 document.getElementById('login').style.display = 'block';
	 document.getElementById('signup').style.display = 'block';
	 document.getElementById('logout').style.display = 'none';*/
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