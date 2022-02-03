const deleteProduct = (prodId, csrfToken) => {
  fetch(`/admin/product/${prodId}`, {
    method: 'DELETE',
    headers: {
      'csrf-token': csrfToken
    }
  })
    .then(result => {
      console.log(result);
    })
    .catch(console.log)
}