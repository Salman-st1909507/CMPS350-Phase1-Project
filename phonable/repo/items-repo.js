import * as utils from "../utils/utils.js";
import * as components from "../utils/components.js";
export function getItems(text) {
  let searchText;
  let items = [];

  if (!text) {
    searchText = "";
  } else {
    searchText = text.toLowerCase();
  }

  if (!localStorage.items) {
    localStorage.items = JSON.stringify(items);
  } else {
    items = JSON.parse(localStorage.items);
  }

  return items.filter((item) => item.name.toLowerCase().includes(searchText));
}

export function getItem(itemId) {
  const items = getItems();
  if (items) {
    const item = items.find((item) => item.itemId === itemId);
    return item;
  }
  return null;
}

export function updateItem(updatedItem, itemId, sellerId) {
  let items = getItems();
  const index = items.findIndex((item) => item.itemId == itemId);
  if (index > -1) {
    items[index] = { ...updatedItem, itemId, sellerId };
    localStorage.setItem("items", JSON.stringify(items));
  }
}
export function updateItemQ(updatedItem) {
  let items = getItems();
  const index = items.findIndex((item) => item.itemId == updatedItem.itemId);
  if (index > -1) {
    items[index] = updatedItem;
    localStorage.setItem("items", JSON.stringify(items));
  }
}
export function addItem(item, sellerId) {
  const items = getItems();
  const newItem = item;

  const existingItem = items.find(
    (existingItem) => existingItem.name === newItem.name
  );

  if (existingItem) {
    components.popup3(
      "Item Already Exists, so do you want to update existing item quanitity ?"
    );
  } else {
    newItem.itemId = utils.generateRandomId(16);
    newItem.sellerId = sellerId;
    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));
  }
}

export function deleteItem(itemId) {
  const items = getItems();
  const index = items.findIndex((item) => item.itemId == itemId);

  items.splice(index, 1);
  localStorage.items = JSON.stringify(items);
}

export function clearItems() {
  localStorage.removeItem("items");
}

export function getItemsBySellerId(sellerId) {
  const items = getItems();
  return items.filter((item) => item.sellerId == sellerId);
}
