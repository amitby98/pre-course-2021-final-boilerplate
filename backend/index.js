/** @format */

const express = require("express");
const fs = require("fs");
const app = express();
// app.use(express.json());
const port = 3000;

// app.get("/api/date/now", (req, res) => {
//   res.send("17.2.2021");
// });

// let list = {
//   task1: "first task",
//   task2: "second task",
// };

app.get("/v3/b/:id", (req, res) => {
  let id = req.params.id;
  const backendContent = fs.readFileSync(`./backend/${id}.json`);
  res.send(backendContent);
});

// app.post("/b", (req, res) => {
//   console.log(list[id]);
//   res.send(list[id]);
// });
app.put("/v3/b/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;

  if (id) {
    id = body;
    res.send(id);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
