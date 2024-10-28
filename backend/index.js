const express = require("express");
const { getCurrent, getHistory, addData } = require("./router");
const errorHandler = require("./errorHandler");
const PORT = 3000;
require("dotenv").config();
const app = express();

app.get("/api/current", getCurrent);
app.get("/api/history/:id", getHistory);
app.post("/api/data", addData);

app.use(errorHandler);

app.listen(PORT || 3000, () => {
  console.log("Listening...");
});
