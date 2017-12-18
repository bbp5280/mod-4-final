const postNewItem = (event) => {
  event.preventDefault();
  let itemName = $('.item-name').val();
  let lingerReason = $('.item-linger-reason').val();
  let condition = $('.dropdown-option').val()
}



$('.add-items-form').on('click', '.submit-button', (event) => inputValues(event));
