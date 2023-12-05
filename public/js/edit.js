const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const post_id = document.querySelector('#post-id').value.trim();

  // if (title && content && comment) {
    if (title && content && post_id ) {
    // console.log(title, content);
    const response = await fetch(`/api/post/${post_id}`, {
      method: 'PUT',
      // body: JSON.stringify({ name, content, comment }),
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

document
  .querySelector('.edit-post-form')
  .addEventListener('submit', newFormHandler);

