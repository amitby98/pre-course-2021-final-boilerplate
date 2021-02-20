/** @format */
const uuid = require("uuid");
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const dir = "./bins";
app.use(express.json());
app.use(cors());
const port = 3000;

//a GET request to /b returns a list of objects
app.get("/v3/b", (req, res) => {
  const dirContent = [];
  try {
    fs.readdir(dir, (err, files) => {
      for (file of files) {
        const fileContent = JSON.parse(fs.readFileSync(`./bins/${file}`));
        let temp = fileContent;
        dirContent.push(temp);
      }
      res.status(200).send(JSON.stringify(dirContent));
    });
  } catch (err) {}
});

//a GET request to /b/{id} returns the details of the object 123
app.get("/v3/b/:id", (req, res) => {
  let id = req.params.id;
  try {
    const backendContent = fs.readFileSync(`./bins/${id}.json`);
    res.send(backendContent);
  } catch (e) {
    res.status(422).json({ message: "Invalid Record ID" });
  }
});

//a DELETE request to /b/{id} delete a object
app.delete("/v3/b/:id", (req, res) => {
  let id = req.params.id;
  try {
    fs.unlinkSync(`./bins/${id}.json`);
    res.send(true);
  } catch (e) {
    res.status(422).json({ message: "Invalid Record ID" });
  }
});

//a POST request to /b create new object and return the new object
app.post("/v3/b", (req, res) => {
  if (!req.body || !req.body.text || !req.body.priority) {
    return res.status(400).json({ message: "please send correct body" });
  }
  req.body.id = uuid.v4();
  let jsonContent = JSON.stringify(req.body);
  console.log(jsonContent);
  fs.writeFile(
    `./bins/${req.body.id}.json`,
    jsonContent,
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occur while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    }
  );
  res.send(req.body);
});

//a PUT request to /b/{id} get in the body params updated object and return the updated object
app.put("/v3/b/:id", (req, res) => {
  if (!req.body || !req.body.text || !req.body.priority) {
    return res.status(400).json({ message: "please send correct body" });
  }
  if (req.body.id && req.body.id != req.params.id) {
    return res
      .status(400)
      .json({ message: "please send the same id in the body and the url" });
  }
  if (!req.body.id) {
    req.body.id = req.params.id;
  }
  let jsonContent = JSON.stringify(req.body);
  console.log(jsonContent);

  if (!fs.existsSync(`./bins/${req.body.id}.json`)) {
    return res.status(422).json({ message: "id is not exists" });
  }

  fs.writeFile(
    `./bins/${req.body.id}.json`,
    jsonContent,
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occur while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    }
  );
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
