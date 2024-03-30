import * as utils from "../utils/utils.js";
import * as usersRepo from "../repo/users-repo.js";

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    const user = utils.usersData.find((user) => user.username === username);

    if (user && user.password == password) {
      usersRepo.addUser(user);
      usersRepo.setCurrentUserId(user.userId);
      usersRepo.getCurrentUserId();

      window.location.href = "main.html";
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
