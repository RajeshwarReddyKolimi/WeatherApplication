const express = require("express");
const {
  getCurrent,
  getHistory,
  addData,
  searchLocation,
} = require("./service");
const errorHandler = require("./errorHandler");
const PORT = 3000;
const cors = require("cors");
const autoCommit = require("./autocommit");
require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: "https://wavefuel-weather-by-rajeshwar.netlify.app",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://wavefuel-weather-by-rajeshwar.netlify.app"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.get("/api/current", getCurrent);
app.get("/api/history", getHistory);
app.post("/api/data", addData);
app.get("/api/search", searchLocation);

app.use(errorHandler);
// setInterval(autoCommit, 10 * 60 * 1000);

app.listen(PORT || 3000, () => {
  console.log("Listening...");
});
