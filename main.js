"use strict";

//Requirements

const express = require("express"),
	app = express(),
	layouts = require("express-ejs-layouts"),
	mongoose = require("mongoose"),
	calendarController = require("./controllers/calendarController"),
	listController = require("./controllers/listController"),
	recipesController = require("./controllers/recipesController"),
  morgan = require("morgan");


//Set up connection to database

mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost:27017/yummify",
	{ useNewUrlParser: true, useFindAndModify: false }
);

mongoose.Promise = global.Promise;

//Set up the required settings

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
	express.urlencoded({
		extended: true
	})
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));
app.use("/static", express.static(__dirname + "public"));
//Log the request method, URL, status code and time taken to process a response
app.use(morgan(":method :url :status * :response-time ms"));

//Routes

// app.get("/", recipesController.showPage);
app.get("/", recipesController.getAllRecipes);
app.get("/calendar", calendarController.showPage);
app.get("/list", listController.showPage);
app.get("/:id", recipesController.showRecipe);
app.get("/:id/edit", recipesController.editRecipe);
app.post("/:id", recipesController.updateRecipe);

//Start listening to the PORT
app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost:${app.get("port")}`);
});
