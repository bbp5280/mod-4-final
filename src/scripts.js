const submitNewItem = (event) => {
  event.preventDefault();
  let itemToPost = {
    itemName: $('.item-name').val(),
    lingerReason: $('.item-linger-reason').val(),
    cleanliness: $('.dropdown-option').val()
  };
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

const appendNewItem = () => {
  
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
  numberOfItemCleanliness(items);
}

const numberOfGarageItems = (items) => {
  $('.items-count-container').append(
    `<p class='item-count'>You Have ${items.length} In Your Garage</p>`
  );
}

const filterCondition = (items, condition) => {
  const filteredItems = items.filter(item => item.cleanliness === condition)
  return filteredItems.length;
}

const numberOfItemCleanliness = (items) => {
  const numRancid = filterCondition(items, 'Rancid');
  $('.items-count-container').append(
   `<p class='item-cleanliness-count sparkling'>You Have ${filterCondition(items, 'Sparkling')} Sparkling Items In Your Garage</p>
    <p class='item-cleanliness-count dusty'>You Have ${filterCondition(items, 'Dusty')} Dusty Items In Your Garage</p>
    <p class='item-cleanliness-count rancid'>You Have ${filterCondition(items, 'Rancid')} Rancid Items In Your Garage</p>`
  );
}



$('.add-items-form').on('click', '.submit-button', (event) => submitNewItem(event));
$(document).ready(() => getItems())
