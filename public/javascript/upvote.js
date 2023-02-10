async function upvoteClickHandler(event) {
    event.preventDefault();
  
   //able to use the post_id from URL (http://localhost:3001/post/1)
   //split into an array based on "/" and then grab the last item in the array
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/api/posts/upvote', {
      method: 'PUT',
      body: JSON.stringify({
        post_id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);
  