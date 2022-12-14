const express = require("express");

const cors = require("cors");

const databaseConfiguration = require('./configurations/database.js');

const todo = require("./routers/todo.routes.js");
const authRoutes = require('./routers/auth.routes');

const dotenv = require("dotenv");
const { requireSignIn, isAuth } = require("./utils/authentication.js");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

//connecting to the mongodb database
databaseConfiguration();

//adding cors
app.use(cors());

//add the middlewares
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('<h1>Server is up and running!!</h1>'))

app.use("/api", authRoutes);
//using the todo routes
app.use("/api/:userID/todoapp", requireSignIn,isAuth,todo);


// listen
app.listen(PORT, () =>
  console.log(`Sever is running on http://localhost:${PORT}`)
);