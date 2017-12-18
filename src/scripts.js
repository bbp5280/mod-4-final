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

const getItems = () => {
  fetch('/api/v1/garage_items')
    .then(response => response.json())
    .then(parsed => appendGarageItems(parsed))
    .catch(error => console.log(error))
}

const appendGarageItems = (items) => {
  items.forEach(item => {
    $('.items-list').append(
      `<li class='garage-item item-id-${item.id}'>${item.itemName}</li>`);
  })
  numberOfGarageItems(items);
}

const numberOfGarageItems = (items) => {
  $('.items-count-container').append(
    `<p class='item-count'>You Have ${items.length} In Your Garage</p>`
  );
}

const filterCondition = (items, condition) {
  const filteredItems = items.filter(item => item.cleanliness === condition)
  
}


$('.add-items-form').on('click', '.submit-button', (event) => submitNewItem(event));
$(document).ready(() => getItems())
