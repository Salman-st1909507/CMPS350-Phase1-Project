import * as itemsRepo from "../repo/items-repo.js";
import * as usersRepo from "../repo/users-repo.js";

document.addEventListener("DOMContentLoaded", function () {
  const uploadForm = document.querySelector("#uploadForm");
  const itemGrid = document.querySelector("#itemGrid");

  uploadForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newItem = {
      name: document.querySelector("#itemName").value,
      price: parseFloat(document.querySelector("#price").value),
      quantity: parseInt(document.querySelector("#quantity").value),
      picture: document.querySelector("#itemImage").value,
      details: document.querySelector("#details").value,
    };

    const editItemId = uploadForm.dataset.editItemId;
    if (editItemId) {
      const sellerId = usersRepo.getCurrentUserId();
      itemsRepo.updateItem(newItem, editItemId, sellerId);
    } else {
      itemsRepo.addItem(newItem, usersRepo.getCurrentUserId());
    }

    uploadForm.reset();
    delete uploadForm.dataset.editItemId;

    displayItems(usersRepo.getCurrentUserId());
  });

  function displayItems(userId) {
    itemGrid.innerHTML = "";
    const items = itemsRepo.getItemsBySellerId(userId);
    items.forEach(addItemCard);
  }

  function addItemCard(item) {
    const itemCard = document.createElement("div");
    itemCard.classList.add("item-card");

    itemCard.innerHTML = `
      <img src="${item.picture}" alt="Item Image">
      <h3>${item.name}</h3>
      <p>Price: $${item.price}</p>
      <p>Available Quantity: ${item.quantity}</p>
      <p>Details: ${item.details}</p>
      <button class="edit-button" data-item-id="${item.itemId}">Edit Item</button>
      <button class="delete-button" data-item-id="${item.itemId}">Delete Item</button>
    `;

    itemCard
      .querySelector(".edit-button")
      .addEventListener("click", function () {
        const itemId = this.dataset.itemId;
        const selectedItem = itemsRepo.getItem(itemId);
        populateFormForEdit(selectedItem);
      });

    itemCard
      .querySelector(".delete-button")
      .addEventListener("click", function () {
        const itemId = this.dataset.itemId;
        itemsRepo.deleteItem(itemId);
        displayItems(usersRepo.getCurrentUserId());
      });

    itemGrid.appendChild(itemCard);
  }

  function populateFormForEdit(item) {
    document.querySelector("#itemName").value = item.name;
    document.querySelector("#price").value = item.price;
    document.querySelector("#quantity").value = item.quantity;
    document.querySelector("#itemImage").value = item.picture;
    document.querySelector("#details").value = item.details;

    uploadForm.dataset.editItemId = item.itemId;
  }

  displayItems(usersRepo.getCurrentUserId());
});
