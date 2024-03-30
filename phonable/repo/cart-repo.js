export function getCartItems(customerId) {
  let cartItems = [];

  if (!localStorage.cartItems) {
    localStorage.cartItems = JSON.stringify(cartItems);
  } else {
    cartItems = JSON.parse(localStorage.cartItems);
  }
  if (!customerId) {
    return cartItems;
  }
  return cartItems.filter((item) => item.customerId == customerId);
}

export function getCartItem(itemId, customerId) {
  const cartItems = getCartItems();
  if (cartItems) {
    const item = cartItems.find(
      (item) => item.itemId == itemId && item.customerId == customerId
    );
    return item;
  }
  return null;
}
export function updateCartItem(updatedCartItem) {
  const cartItems = getCartItems();
  const index = cartItems.findIndex(
    (item) =>
      item.itemId == updatedCartItem.itemId &&
      item.customerId == updatedCartItem.customerId
  );
  if (index > -1) {
    cartItems[index] = updatedCartItem;
    localStorage.cartItems = JSON.stringify(cartItems);
  }
}
export function addCartItem(cartItem, quantity, customerId) {
  const cartItems = getCartItems();
  const newCartItem = cartItem;
  const existingCartItem = getCartItem(newCartItem.itemId, customerId);

  if (!existingCartItem) {
    newCartItem.customerId = customerId;
    newCartItem.quantity = quantity;
    newCartItem.checked = true;
    cartItems.push(newCartItem);
    localStorage.cartItems = JSON.stringify(cartItems);
  } else {
    existingCartItem.quantity += quantity;
    updateCartItem(cartItem);
  }
}

export function deleteCartItem(itemId, customerId) {
  let cartItems = getCartItems();
  const index = cartItems.findIndex(
    (item) => item.itemId == itemId && item.customerId == customerId
  );

  cartItems.splice(index, 1);
  localStorage.cartItems = JSON.stringify(cartItems);
}

export function clearCart() {
  localStorage.removeItem("cartItems");
}

export function initLocalStorage(jsonData) {
  clearCart();
  jsonData.forEach((item) => addCartItem(item));
}
