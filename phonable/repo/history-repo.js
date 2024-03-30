export function getItems() {
  let historyItems = [];

  if (!localStorage.historyItems) {
    localStorage.historyItems = JSON.stringify(historyItems);
  } else {
    historyItems = JSON.parse(localStorage.historyItems);
  }

  return historyItems;
}

export function getItem(itemId, buyerId) {
  const items = getItems();
  if (items) {
    const item = items.find(
      (item) => item.itemId == itemId && item.buyerId == buyerId
    );
    return item;
  }
  return null;
}

export function getHistoryItems(buyerId) {
  const items = getItems();
  return items.filter((item) => item.buyerId === buyerId);
}

export function getBoughtItems(sellerId) {
  const items = getItems();
  return items.filter((item) => item.sellerId === sellerId);
}

export function addItem(item, buyerId) {
  const items = getItems();
  const newItem = item;
  const doesExist = getItem(newItem.itemId, buyerId) != null;
  if (!doesExist) {
    newItem.buyerId = buyerId;
    items.push(newItem);
    localStorage.historyItems = JSON.stringify(items);
  }
}

export function clearHistoryItems() {
  localStorage.removeItem("historyItems");
}
