// Get references to the button and the list
const addBtn = document.getElementById('addBtn');
const itemList = document.getElementById('itemList');

// Create a function to add items
function addItem() {
  // Prompt the user for the item to add
  const itemName = prompt('Enter item name:');

  // Create a list item element
  const listItem = document.createElement('li');
  listItem.textContent = itemName;

  // Append the list item to the list
  itemList.appendChild(listItem);
}

// Add an event listener to the button
addBtn.addEventListener('click', addItem);

