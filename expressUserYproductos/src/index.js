require('@babel/register');
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");
const prodRoute = require("./routes/productos");
const { getCredentials, getToken } = require("../src/utils/headers");
const { signToken, verifyToken, validateExpiration } = require("./utils/token");
const { getUser } = require("./utils/users");


// settings
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", prodRoute);

app.get("/", (req, res) => {
  res.send("Bienvenido a mi API");
});

app.get("/public", (req, res) => {
  res.send("Soy un EndPoint público");
});

app.get("/private", (req, res) => {
  try {
    const token = getToken(req);
    const payload = verifyToken(token);

    validateExpiration(payload);

    res.send("Soy un EndPoint privado");
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

app.post("/token", (req, res) => {
  try {
    const { username, password } = getCredentials(req);
    const user = getUser(username, password);
    const token = signToken(user);

    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Conectando a la BD MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log(`🌐 Escuchando en http://localhost:${port}`));
