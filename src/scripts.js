const submitNewItem = (event) => {
  event.preventDefault();
  let itemToPost = {
    itemName: $('.item-name').val(),
    lingerReason: $('.item-linger-reason').val(),
    cleanliness: $('.dropdown-option').val()
  };

  console.log(itemToPost);
  postNewItem(itemToPost);
}

const postNewItem = (itemObject) => {

  fetch('/api/v1/garage_items', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemObject)
  })
    .then(response => response.json())
    .then(parsed => console.log(parsed))
    .catch(error => console.log(error));
}


$('.add-items-form').on('click', '.submit-button', (event) => submitNewItem(event));
