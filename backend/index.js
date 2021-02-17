/** @format */

console.log("Hi");
const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

app.get("/api/date/now", (req, res) => {
  res.send("17.2.2021");
});

app.post("/b", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

console.log("hi2");
