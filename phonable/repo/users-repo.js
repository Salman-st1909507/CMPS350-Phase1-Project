export function getCurrentUserId() {
  return JSON.parse(localStorage.currentUserId);
}

export function setCurrentUserId(userId) {
  localStorage.currentUserId = JSON.stringify(userId);
}

export function getCurrentUser() {
  const userId = getCurrentUserId();
  return getUser(userId);
}

export function clearCurrentUserId() {
  localStorage.removeuser("currentUserId");
}

export function getUsers() {
  let users = [];

  if (!localStorage.users) {
    localStorage.users = JSON.stringify(users);
  } else {
    users = JSON.parse(localStorage.users);
  }

  return users;
}

export function getUser(userId) {
  const users = getUsers();
  if (users) {
    const user = users.find((user) => user.userId == userId);
    return user;
  }
  return null;
}
export function getUserByUsername(username) {
  const users = getUsers();
  if (users) {
    const user = users.find((user) => user.username == username);
    return user;
  }
  return null;
}

export function updateUser(updatedUser) {
  const users = getUsers();
  const index = users.findIndex((user) => user.userId == updatedUser.userId);
  if (index > -1) {
    users[index] = updatedUser;
    localStorage.users = JSON.stringify(users);
  }
}

export function addUser(user) {
  let users = getUsers();
  const newUser = user;
  const doesExist = getUser(newUser.userId) != null;
  if (!doesExist) {
    users.push(newUser);
    localStorage.users = JSON.stringify(users);
  } else {
    updateUser(newUser);
  }
}

export function clearUsers() {
  localStorage.removeuser("users");
}
export function getUserNameByID(userId) {
  const users = getUsers();
  const user = users.find((user) => user.userId == userId);
  return user.username;
}
