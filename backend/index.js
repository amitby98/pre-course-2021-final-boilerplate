/** @format */
const uuid = require("uuid");
const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
const port = 3000;

app.get("/v3/b/:id", (req, res) => {
  let id = req.params.id;
  try {
    const backendContent = fs.readFileSync(`./${id}.json`);
    res.send(backendContent);
  } catch (e) {
    res.status(422).json({ message: "Invalid Record ID" });
  }
});

app.delete("/v3/b/:id", (req, res) => {
  let id = req.params.id;
  try {
    fs.unlinkSync(`./${id}.json`);
    res.send(true);
  } catch (e) {
    res.status(422).json({ message: "Invalid Record ID" });
  }
});

app.post("/v3/b", (req, res) => {
  if (!req.body || !req.body.text || !req.body.priority) {
    return res.status(400).json({ message: "please send correct body" });
  }
  req.body.id = uuid.v4();
  let jsonContent = JSON.stringify(req.body);
  console.log(jsonContent);
  fs.writeFile(`./${req.body.id}.json`, jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occur while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
