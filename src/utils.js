const API_KEY = "$2b$10$ACsxVNXnozYAgSXjbvpoK.htaNg4CTPxW4wawEI7zBnGpC6KA/AHS";
const MY_BIN_ID = "60183cc6abdf9c556796446d";

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
  const result = await response.json();
  console.log(result.record);
  return result.record;
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
// 60183cc6abdf9c556796446d
//6015914f13b20d48e8bf1b78
//https://api.jsonbin.io/b/60183cc6abdf9c556796446d
