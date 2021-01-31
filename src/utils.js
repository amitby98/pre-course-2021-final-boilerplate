const API_KEY = "$2b$10$ACsxVNXnozYAgSXjbvpoK.htaNg4CTPxW4wawEI7zBnGpC6KA/AHS"; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const MY_BIN_ID = "6016cb6e0ba5ca5799d1a79e";

// Gets data from persistent storage by the given key and returns it
async function getPersistent(key) {
  let response = await fetch("https://api.jsonbin.io/v3/b/" + key + "/latest", {
    method: "GET",
    headers: {
      "X-Master-Key": API_KEY,
    },
  });
  //console.log(response);
  //console.log(response.body);
  return (await response.json()).record;
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
async function setPersistent(key, tasks) {
  await fetch("https://api.jsonbin.io/v3/b/" + key, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
    body: JSON.stringify(tasks),
  });
  return true;
}
