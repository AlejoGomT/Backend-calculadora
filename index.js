const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const fs = require("fs");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//1. Get all
app.get("/memory", (req, res, next) => {
  try {
    const jsonString = fs.readFileSync("./data.json", "utf-8");
    const memory = JSON.parse(jsonString);
    res.send(memory);
  } catch (error) {
    next({
      statusCode: 500,
      message: `Cant read Data`,
    });
  }
});

//2. Get one (by id)
app.get("/memory/:id", (req, res, next) => {
  const { params = {} } = req;
  const { id = "" } = params;
  try {
    const jsonString = fs.readFileSync("./data.json", "utf-8");
    const memory = JSON.parse(jsonString);
    const data = memory[id];
    if (data) {
      res.json(memory[id]);
    } else {
      return res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: `Cant read Data`,
    });
  }
});

//3. Post (Se envía el body)
app.post("/memory", (req, res, next) => {
  const { body = {} } = req;
  const { operation, result } = req.body;
  if (operation && result) {
    try {
      const jsonString = fs.readFileSync("./data.json", "utf-8");
      const memory = JSON.parse(jsonString);
      const id = uuidv4();
      memory[id] = {
        ...body,
        id: id,
      };
      fs.writeFileSync("./data.json", JSON.stringify(memory, null, 2));
      res.status(201).json(body);
    } catch (error) {
      next({
        statusCode: 500,
        message: `Cant read Data`,
      });
    }
  } else {
    next({
      statusCode: 400,
      message: `Bad Request`,
    });
  }
});

//4. Put (Se envía el body)
app.put("/memory/:id", (req, res, next) => {
  const { id } = req.params;
  const { operation, result } = req.body;
  if (operation && result) {
    try {
      const jsonString = fs.readFileSync("./data.json", "utf-8");
      const memory = JSON.parse(jsonString);
      const data = memory[id];
      if (data) {
        memory[id].operation = operation;
        memory[id].result = result;
        fs.writeFileSync("./data.json", JSON.stringify(memory, null, 2));
        res.status(201).json(data);
      } else {
        return res.status(404).json({ message: "Data not found" });
      }
    } catch (err) {
      next({
        statusCode: 500,
        message: `Cant read Data`,
      });
    }
  } else {
    next({
      statusCode: 400,
      message: `Bad Request`,
    });
  }
});

//5. Delete
app.delete("/memory/:id", (req, res) => {
  const { id } = req.params;
  try {
    const jsonString = fs.readFileSync("./data.json", "utf-8");
    const memory = JSON.parse(jsonString);
    delete memory[id];
    fs.writeFileSync("./data.json", JSON.stringify(memory, null, 2));
    res.sendStatus(204);
  } catch (err) {
    next({
      statusCode: 500,
      message: `Cant read Data`,
    });
  }
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
