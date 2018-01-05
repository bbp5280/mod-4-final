const submitNewItem = (event) => {
  event.preventDefault();
  const itemToPost = {
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

const sortItems = (items) => {
  return sorted = items.sort((a, b) => {
  const nameA = a.itemName.toUpperCase();
  const nameB = b.itemName.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
    });
}

const sortAToZ = () => {
  $('.items-list').html('')
  $('.items-count-container').html('')
  fetch('/api/v1/garage_items')
    .then(response => response.json())
    .then(parsed => {
      const sorted = sortItems(parsed)
      appendGarageItems(sorted)
      })
    .catch(error => console.log(error))
}

const sortDescending = (items) => {
  return sorted = items.sort((a, b) => {
    const nameA = a.itemName.toUpperCase();
    const nameB = b.itemName.toUpperCase();
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  });
}


const sortZToA = () => {
  $('.items-list').html('')
  $('.items-count-container').html('')
  fetch('/api/v1/garage_items')
    .then(response => response.json())
    .then(parsed => {
      const sorted = sortDescending(parsed)
      appendGarageItems(sorted)
      })
    .catch(error => console.log(error))
}


const appendGarageItems = (items) => {

  // const sorted = sortItems(items)
  items.forEach(item => {
    $('.items-list').append(
      `<div class='item-container'>
      <div>
      <h3 class='garage-item-name item-id-${item.id}' id='item${item.id}' data='${item.id}'>${item.itemName}</h3>
      <p class='garage-item-name show-details-${item.id} deails' id='item${item.id}' data='${item.id}'>Details</p>
      </div>
       <div class='garage-item-details item-id-${item.id} inactive-details'>
       <p class='item-details item-id-${item.id}'>Reason For Holding: ${item.lingerReason}</p>
       <p class='item-details item-id-${item.id} cleanliness-id-${item.id}'>Cleanliness Level: ${item.cleanliness}</p>
       <select class="condition-update" value="Select Condition" id='item${item.id}'>
         <option class="dropdown-option">Select One To Update</option>
         <option class="dropdown-option" value='Sparkling'>Sparkling</option>
         <option class="dropdown-option" value='Dusty'>Dusty</option>
         <option class="dropdown-option" value='Rancid'>Rancid</option>
       </select>
     </div>
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
    `<p class='item-count'>Total Items: ${items.length} </p>`
  );
}

const filterCondition = (items, condition) => {
  const filteredItems = items.filter(item => item.cleanliness === condition)
  return filteredItems.length;
}

const numberOfItemCleanliness = (items) => {
  $('.items-count-container').append(
   `<p class='item-cleanliness-count sparkling'>Sparkling Items: ${filterCondition(items, 'Sparkling')} </p>
    <p class='item-cleanliness-count dusty'>Dusty Items: ${filterCondition(items, 'Dusty')} </p>
    <p class='item-cleanliness-count rancid'>Rancid Items: ${filterCondition(items, 'Rancid')} </p>`
  );
}


const slideDoor = () => {
  $('.sliding-door').slideToggle(4000, () => {
    const text = $('.open-close-door').text();
    text === 'Close Garage Door' ?
      $('.open-close-door').text('Open Garage Door') :
      $('.open-close-door').text('Close Garage Door')
  });
}

const updateCleanliness = () => {
  const updateBody = {
    cleanliness: $(event.target).val()
  }
  const id = $(event.target).closest('.condition-update').attr('id').slice(4)

   patchCleanliness(id, updateBody)
  $(`.cleanliness-id-${id}`).text(`Cleanliness Level: ${$(event.target).val()}`)

}

const patchCleanliness = (id, body) => {
  fetch(`/api/v1/garage_items/${id}`, {
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .catch(error => console.log(error));
}

$('.open-close-door').on('click', slideDoor)
$('.add-items-form').on('click', '.submit-button', (event) => submitNewItem(event));
$('.add-items-form').on('click', '.sort-a-z', (event) => sortAToZ(event));
$('.add-items-form').on('click', '.sort-z-a', (event) => sortZToA(event));
$('.items-container').on('click', '.garage-item-name', (event) => showDetails(event));
$('.items-container').on('change', 'select', (event) => updateCleanliness(event))
