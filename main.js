const express = require("express");

const cors = require("cors");

const databaseConfiguration = require('./configurations/database.js');

const todo = require("./routers/todo.routes.js");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

//connecting to the mongodb database
databaseConfiguration();

//adding cors
app.use(cors({ origin: true, credentials: true }));

//add the middlewares
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('<h1>Server is up and running!!</h1>'))

//using the todo routes
app.use("/api/todoapp", todo);

// listen
app.listen(PORT, () =>
  console.log(`Sever is running on http://localhost:${PORT}`)
);