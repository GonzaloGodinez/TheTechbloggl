const newFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#post-comment').value.trim();
  const post_id = document.querySelector('#post-id').value.trim();
  // const comment = document.querySelector('#comment-comment').value.trim();

  // if (title && content && comment) {
    if (comment && post_id ) {
    // console.log(title, content);
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      // body: JSON.stringify({ name, content, comment }),
      body: JSON.stringify({ comment, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);

