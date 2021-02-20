// Gets data from persistent storage by the given key and returns it
function getPersistent() {
  return fetch("http://localhost:3000/v3/b/", {
    method: "GET",
  });
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
async function setPersistent(taskObject) {
  let idOrEmpty = taskObject.id ?? "";
  return await fetch(`http://localhost:3000/v3/b/${idOrEmpty}`, {
    method: taskObject.id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObject),
  });
}

async function deleteObject(taskObject) {
  return await fetch(`http://localhost:3000/v3/b/${taskObject.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
