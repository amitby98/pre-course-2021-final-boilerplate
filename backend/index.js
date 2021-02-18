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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
