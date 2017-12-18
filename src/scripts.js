const submitNewItem = (event) => {
  event.preventDefault();
  let itemToPost = {
    itemName: $('.item-name').val(),
    lingerReason: $('.item-linger-reason').val(),
    cleanliness: $('.condition-select').val()
  };
  postNewItem(itemToPost);
  $('.item-name').val('')
  $('.item-linger-reason').val('')
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
    .then(parsed => getItems())
    .catch(error => console.log(error));
}

const getItems = () => {
  $('.items-list').html('')
  $('.items-count-container').html('')
  fetch('/api/v1/garage_items')
    .then(response => response.json())
    .then(parsed => appendGarageItems(parsed))
    .catch(error => console.log(error))
}

getItems()

const appendGarageItems = (items) => {
  items.forEach(item => {
    $('.items-list').append(
      `<h3 class='garage-item-name item-id-${item.id}' id='item${item.id}'>${item.itemName}</h3>
       <div class='garage-item-details item-id-${item.id} inactive-details'>
       <p class='item-details item-id-${item.id}'>Reason For Holding: ${item.lingerReason}</p>
       <p class='item-details item-id-${item.id}'>Cleanliness Level: ${item.cleanliness}</p>
     </div>`);
  })
  numberOfGarageItems(items);
  numberOfItemCleanliness(items);
}

const showDetails = (event) => {
  const itemNumber = event.target.id.slice(4)
  const divToShow = $(`.item-id-${itemNumber}`)

  divToShow.toggleClass('active-details')
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
$('.items-container').on('click', '.garage-item-name', (event) => showDetails(event));
