document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeid = urlParams.get('id');  // Correctly get the recipe ID from the query parameter
   
    const form = document.getElementById('commentForm');
    const commentsContainer = document.getElementById('comments-container'); 
    function clearComments() {
        commentsContainer.innerHTML = ''; // This clears only the contents of the comments container
    }

    // Existing code for loading and displaying comments
    function loadComments() {
        fetch(`/api/recipe/${recipeid}/comments`)
        .then(response => response.json())
        .then(data => {
            clearComments(); // Clear existing comments before loading new ones
            // Check if data is actually an array before trying to use forEach
            //if (Array.isArray(data)) {
                if (data.length === 0) {
                    displayNoCommentsMessage();
                } else {
                    data.forEach(comment => displayComment(comment));
                }
            /*} else {
                console.error('Expected an array of comments, but got:', data);
            }*/
        })
        .catch(error => console.error('Failed to load comments:', error));
    }

    function displayComment(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.style = 'border: 1px solid black; border-radius: 5px; padding: 5px; margin-bottom: 10px; background-color: #f0f0f0;';
        commentDiv.innerHTML = `<p><span style="color: #EA9239; font-weight: bold;">${comment.user.Username}:</span><br>${comment.commenttext}</p>`;
        //commentsContainer.appendChild(commentDiv);
        commentsContainer.appendChild(commentDiv);
    }
    function displayNoCommentsMessage() {
        const noCommentsDiv = document.createElement('div');
        noCommentsDiv.id = 'no-comments-div';
        noCommentsDiv.textContent = 'No comments now, you can submit the first one.';
        //noCommentsDiv.className = 'no-comments'; // Add some styles if needed
        commentsContainer.appendChild(noCommentsDiv);
    }

    // Load real comments and clear dummy ones
    clearComments();
    loadComments();

	form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission

        const commentText = document.getElementById('comment').value;
        const apiUrl = `/recipe/${recipeid}/comment`;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add other necessary headers, such as authentication tokens if needed
            },
            body: JSON.stringify({
                commenttext: commentText
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Comment submitted successfully');
                // Optionally clear the form or give user feedback
                document.getElementById('comment').value = '';  // Clear the text area
                const noCommentsMessage = document.getElementById('no-comments-div');
        if (noCommentsMessage) {
            noCommentsMessage.remove();
        }
                addNewCommentDirectly(data.comment); // Update comments display immediately
            } else {
                console.error('Failed to submit comment:', data.message);
            }
        })
        .catch(error => {
            console.error('Error submitting comment:', error);
        });
    });

    function addNewCommentDirectly(comment) {
        const newCommentDiv = createCommentElement(comment);
        commentsContainer.insertBefore(newCommentDiv, commentsContainer.firstChild); // Insert new comment at the top of the container
    }

    function createCommentElement(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.style = 'border: 1px solid black; border-radius: 5px; padding: 5px; margin-bottom: 10px; background-color: #f0f0f0;';
        const username = comment.user && comment.user.Username ? comment.user.Username : 'Unknown user';
        commentDiv.innerHTML = `<p><span style="color: #EA9239; font-weight: bold;">${username}:</span><br>${comment.commenttext}</p>`;
        return commentDiv;
    }
});