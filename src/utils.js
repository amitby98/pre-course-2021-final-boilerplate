const API_KEY = "$2b$10$ACsxVNXnozYAgSXjbvpoK.htaNg4CTPxW4wawEI7zBnGpC6KA/AHS";
const MY_BIN_ID = "60183cc6abdf9c556796446d";

// Gets data from persistent storage by the given key and returns it
function getPersistent(key) {
  return fetch("https://api.jsonbin.io/v3/b/" + key + "/latest", {
    method: "GET",
    headers: {
      "X-Master-Key": API_KEY,
    },
  });
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
function setPersistent(key, tasks) {
  return fetch("https://api.jsonbin.io/v3/b/" + key, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
    body: JSON.stringify(tasks),
  });
}
