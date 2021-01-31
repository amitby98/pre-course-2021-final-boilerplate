let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};

req.open("POST", "https://api.jsonbin.io/b", true);
req.setRequestHeader("Content-Type", "application/json");
req.setRequestHeader(
  "secret-key",
  "$2b$10$ACsxVNXnozYAgSXjbvpoK.htaNg4CTPxW4wawEI7zBnGpC6KA/AHS"
);
req.send('{"Sample": "Hello World"}');
