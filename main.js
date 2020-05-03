"use strict";

//Requirements

const express = require("express"),
app = express(),
layouts = require("express-ejs-layouts"),
mongoose = require("mongoose");

//Set up the required settings

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

//Routes

app.get("/", (req, res) => {
  res.render("index");
});


//Start listening to the PORT
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
