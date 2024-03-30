import * as historyRepo from "../repo/history-repo.js";
import * as usersRepo from "../repo/users-repo.js";
import * as components from "../utils/components.js";

let currentUser = usersRepo.getUser(usersRepo.getCurrentUserId());

document.addEventListener("DOMContentLoaded", async () => {
  // historyRepo.clearHistoryItems();
  const userDetails = document.querySelector(".user-details-container");
  if (currentUser.type == "customer") {
    userDetails.innerHTML = customerDetailsPage();
    loadItems();
  } else {
    userDetails.innerHTML = sellerDetailsPage();
    loadSellerItems();
    historyRepo.getBoughtItems();
  }

  const signOutButton = document.querySelector(".sign-out-button");
  signOutButton.addEventListener("click", () => {
    usersRepo.setCurrentUserId(null);
    window.location.href = "login.html";
  });
});

function loadItems() {
  const itemGrid = document.querySelector(".item-grid");
  if (historyRepo.getHistoryItems(currentUser.userId).length > 0) {
    itemGrid.innerHTML = historyRepo
      .getHistoryItems(currentUser.userId)
      .map((item) => itemCard(item))
      .join("");

    document.querySelectorAll(".item-card").forEach((itemCard, index) => {
      itemCard.addEventListener("click", () => {
        window.location.href = `../pages/ItemDetails.html?itemId=${itemCard.id}`;
      });
    });
  } else {
    itemGrid.innerHTML = components.emptyComponet(
      "No History Reocrds",
      "You have not ordered anything yet."
    );
  }
}

function loadSellerItems() {
  const sellerBoughtItemsTable = document.querySelector(
    "#sellerBoughtItemsGrid"
  );
  const boughtItems = historyRepo.getBoughtItems(currentUser.userId);

  if (boughtItems.length > 0) {
    const tableHTML = `
      <table class="item-table">
        <thead>
          <tr>
            <th>Item Image</th>
            <th>Item Name</th>
            <th>Buyer's Name</th>
            <th>Quantity Bought</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${boughtItems
            .map((item) => {
              const buyer = usersRepo.getUser(item.buyerId);
              return `
              <tr>
                <td><img class="itemImage" src="${item.picture}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${buyer.username}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
              </tr>
            `;
            })
            .join("")}
        </tbody>
      </table>
    `;

    sellerBoughtItemsTable.innerHTML = tableHTML;
  } else {
    sellerBoughtItemsTable.innerHTML = components.emptyComponet(
      "No Bought Items",
      "You haven't bought any items yet."
    );
  }
}

function customerDetailsPage() {
  return `<h3 class="title">User Details</h3>
  <div class="user-details">
  ${userDetailsCard(currentUser)}
  </div>
  <div class="account-buttons row">
      <button
          class="update-account-details-button button">Update Account Details</button>
      <button class="sign-out-button button">Log Out</button></div>

  <h3 class="title">History</h3>
  <div class="item-grid">
  </div>`;
}

function userDetailsCard(currentUser) {
  return `
  <p><strong>User Name:</strong> ${currentUser.username}</p>
  <p><strong>First Name:</strong> ${currentUser.name}</p>
  <p><strong>Last name:</strong> ${currentUser.surname}</p>
  <p><strong>Shipping Address:</strong> ${currentUser.shippingAddress}</p>
  <p><strong>Current Balance:</strong> $${currentUser.moneyBalance.toFixed(
    2
  )}</p>
  `;
}

function SellerDetailsCard(currentUser) {
  return `
  <p><strong>User Name:</strong> ${currentUser.username}</p>
  <p><strong>First Name:</strong> ${currentUser.name}</p>
  <p><strong>Last name:</strong> ${currentUser.surname}</p>
  <p><strong>Company Name:</strong> ${currentUser.companyName}</p>
  `;
}

function sellerDetailsPage() {
  const sellerDetailsContainer = document.querySelector(
    ".user-details-container"
  );
  sellerDetailsContainer.innerHTML = "";

  sellerDetailsContainer.innerHTML += SellerDetailsCard(currentUser);

  return `<h3 class="title">Seller Details</h3>
    <div class="user-details">
      ${SellerDetailsCard(currentUser)}
    </div>
    <div class="account-buttons row">
      <button class="update-account-details-button button">Update Account Details</button>
      <button class="sign-out-button button">Log Out</button>
    </div>

    <div class="item-grid">
    </div>
    <!-- Seller functionalities -->
    <section id="uploadItem">
      <h2 class="uploaditem">Upload an Item</h2>
      <form id="uploadForm" enctype="multipart/form-data">
        <label for="itemName">Item Name:</label>
        <input type="text" id="itemName" name="itemName" required><br>

        <label for="price">Price:</label>
        <input type="number" id="price" name="price" min="0.01" step="0.01" required><br>

        <label for="quantity">Available Quantity:</label>
        <input type="number" id="quantity" name="quantity" min="1" required><br>

        <label for="itemImage">Item URL image:</label>
        <input type="url" id="itemImage" name="itemImage" accept="image/*" required><br>

        <label for="details">Details:</label>
        <input type="text" id="details" name="details"required><br>

        <button type="submit">Upload Item</button>
      </form>
    </section>

    <section id="viewItems">
      <h2 id="c">View Items for Sale</h2>
      <!-- Display items for sale using grid layout -->
      <div class="item-grid" id="itemGrid"></div>
    </section>

    <!-- Display seller's bought items -->
    <section id="sellerBoughtItems"><br>
      <h2 class="xx">History of Bought Items</h2>
      <div class="item-grid2" id="sellerBoughtItemsGrid">
      
      </div>
    </section>`;
}

function itemCard(item) {
  return `
  <div class="item-card column" id="${item.itemId}">
                    <img class="item-image"
                        src="${item.picture}"
                        alt="${item.name}">

                    <div class="item-info column">
                        <p class="item-name">${item.name}</p>
                        <h3 class="item-price">$${item.price}</h3>
                        <h4 class="item-quantity">Quantity Bought: ${item.quantity} </h4>

                    </div>
                </div>
  `;
}
