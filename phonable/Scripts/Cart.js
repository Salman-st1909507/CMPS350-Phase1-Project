import * as cartRepo from "../repo/cart-repo.js";
import * as historyRepo from "../repo/history-repo.js";
import * as itemsRepo from "../repo/items-repo.js";
import * as usersRepo from "../repo/users-repo.js";
import * as components from "../utils/components.js";

let checkoutList = [];

let currentUser = usersRepo.getUser(usersRepo.getCurrentUserId());

document.addEventListener("DOMContentLoaded", async () => {
  updateCheckoutList();
  loadCartItems();
});

function loadCartItems() {
  const shoppingCards = document.querySelector(".shopping-cards");
  const checkoutButton = document.querySelector(".checkout-button");

  if (cartRepo.getCartItems(currentUser.userId).length > 0) {
    shoppingCards.innerHTML = cartRepo
      .getCartItems(currentUser.userId)
      .map((item) => cartItemCard(item))
      .join("");

    document.querySelectorAll(".shopping-cart-card").forEach((itemCard) =>
      itemCard
        .querySelector(".shopping-cart-card-checkbox")
        .addEventListener("change", () => {
          const checkbox = itemCard.querySelector(
            ".shopping-cart-card-checkbox"
          );
          if (checkbox.checked) {
            let cartItem = cartRepo.getCartItem(
              itemCard.id,
              currentUser.userId
            );
            cartItem.checked = checkbox.checked;
            cartRepo.updateCartItem(cartItem);
            checkoutList.push(
              cartRepo.getCartItem(itemCard.id, currentUser.userId)
            );
            updateCheckoutList();
          } else {
            let cartItem = cartRepo.getCartItem(
              itemCard.id,
              currentUser.userId
            );
            cartItem.checked = checkbox.checked;
            cartRepo.updateCartItem(cartItem);
            checkoutList.pop(
              cartRepo.getCartItem(itemCard.id, currentUser.userId)
            );
            updateCheckoutList();
          }
        })
    );

    document.querySelectorAll(".shopping-cart-card").forEach((itemCard) =>
      itemCard
        .querySelector(".shopping-cart-card-delete-button")
        .addEventListener("click", () => {
          cartRepo.deleteCartItem(itemCard.id, currentUser.userId);
          loadCartItems();
          updateCheckoutList();
        })
    );
    document.querySelectorAll(".shopping-cart-card").forEach((itemCard) =>
      itemCard.querySelector(".minus-button").addEventListener("click", () => {
        const updatedCartItem = cartRepo.getCartItem(
          itemCard.id,
          currentUser.userId
        );
        if (updatedCartItem.quantity > 1) {
          updatedCartItem.quantity -= 1;
          cartRepo.updateCartItem(updatedCartItem);
          loadCartItems();
          updateCheckoutList();
        }
      })
    );
    document.querySelectorAll(".shopping-cart-card").forEach((itemCard) =>
      itemCard.querySelector(".plus-button").addEventListener("click", () => {
        const updatedCartItem = cartRepo.getCartItem(
          itemCard.id,
          currentUser.userId
        );
        if (
          updatedCartItem.quantity < itemsRepo.getItem(itemCard.id).quantity
        ) {
          updatedCartItem.quantity += 1;
          cartRepo.updateCartItem(updatedCartItem);
          loadCartItems();
          updateCheckoutList();
        }
      })
    );

    checkoutButton.addEventListener("click", checkout);
  } else {
    shoppingCards.innerHTML = components.emptyComponet(
      "Cart is Empty",
      "Your shopping cart is empty"
    );
  }
}
function checkout() {
  if (checkoutList.length != 0 && getTotal() < currentUser.moneyBalance) {
    checkoutList.forEach((cartItem) => {
      cartRepo.deleteCartItem(cartItem.itemId, currentUser.userId);

      historyRepo.addItem(cartItem, currentUser.userId);

      itemsRepo.updateItemQ({
        ...itemsRepo.getItem(cartItem.itemId),
        quantity:
          itemsRepo.getItem(cartItem.itemId).quantity - cartItem.quantity,
      });

      if (itemsRepo.getItem(cartItem.itemId).quantity <= 0) {
        itemsRepo.deleteItem(cartItem.itemId);
      }
    });

    usersRepo.updateUser({
      ...currentUser,
      moneyBalance: currentUser.moneyBalance - getTotal(),
    });

    checkoutList = [];
    loadCartItems();
    updateCheckoutList();
    currentUser.moneyBalance -= getTotal();

    components.popUpMessage(
      "Your order has been placed successfully!",
      "Stay at Cart",
      false
    );
  }
  if (currentUser.moneyBalance < getTotal()) {
    components.popUpMessage(
      "You don't have enough money to checkout!",
      "Stay at Cart",
      false
    );
  }
}

function getTotal() {
  return checkoutList
    .reduce((acc, curr) => (acc += curr.price * curr.quantity), 0)
    .toFixed(2);
}

function updateCheckoutList() {
  checkoutList = [];
  const list = cartRepo
    .getCartItems(currentUser.userId)
    .filter((cartItem) => cartItem.checked == true);
  list.forEach((item) => checkoutList.push(item));

  let total = getTotal();

  document.querySelector(".checkout-text").innerHTML = `$${total}`;
}

function cartItemCard(cartItem) {
  return `
<div class="shopping-cart-card row" id="${cartItem.itemId}">

<div class="shopping-cart-card-checkbox-image-info row">

<input class="shopping-cart-card-checkbox" type="checkbox" ${
    cartItem.checked ? "checked" : ""
  }
  name="shopping-cart-card-checkbox" id>

<img
  class="shopping-cart-card-image"
  src="${cartItem.picture}"
  alt="${cartItem.name}">

<p class="shopping-cart-card-details"></p>
<div class="shopping-cart-card-info column">
              <p class="shopping-cart-card-name">${cartItem.name}</p>
              <p class="shopping-cart-card-details">${cartItem.details}</p>
            </div>
            </div>
<div class="shopping-cart-buttons column">

  <p class="shopping-cart-card-price">$${cartItem.price * cartItem.quantity}</p>

  <div class="shopping-cart-card-quantity-control row">
    <button class="minus-button button">-</button>
    <p class="shopping-cart-card-quantity">${cartItem.quantity}</p> <button
      class="plus-button button">+</button>
  </div>

  <button class="shopping-cart-card-delete-button button">Delete</button>
</div>

</div>
`;
}
