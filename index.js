const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

app.use(express.json());
app.use(cors());

let memory = [];

app.get("/", (request, response) => {
  response.send(memory);
});

app.get("/memory", (request, response) => {
  response.json(memory);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//1. Get all
app.get("/memory", (req, res) => {
  res.json(memory);
});

//2. Get one (by id)
app.get("/memory/:id", (req, res, next) => {
  const { params = {} } = req;
  const { id = "" } = params;
  const data = memory.find(function (element) {
    return id === element.id;
  });

  if (data) {
    res.json(data);
  } else {
    next({
      statusCode: 404,
      message: `Data operation with ${id}, Not Found`,
    });
  }
});

//3. Post (Se envía el body)
app.post("/memory", (req, res) => {
  const { body = {} } = req;
  const data = {
    ...body,
    id: uuidv4(),
  };
  memory.push(data);
  res.status(201).json(body);
});

//4. Put (Se envía el body)
app.put("/memory/:id", (req, res) => {
  const { id } = req.params;
  const { operation, result } = req.body;
  const data = memory.find((data) => data.id === id);

  if (!data) {
    return res.status(404).json({ message: "Data not found" });
  }

  data.operation = operation;
  data.result = result;
  res.json(data);
});

//5. Delete
app.delete("/memory/:id", (req, res) => {
  const { id } = req.params;
  const index = memory.findIndex((data) => data.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Data not found" });
  }

  memory.splice(index, 1);
  res.sendStatus(204);
});

app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: "Route Not Found",
  });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Error" } = err;
  console.log(message);
  res.status(statusCode);
  res.json({
    message,
  });
});
