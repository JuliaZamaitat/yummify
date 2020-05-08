"use strict";

const mongoose = require("mongoose"),
  Recipe = require("./models/recipe");
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/yummify",
  { useNewUrlParser: true, useFindAndModify: false }
);

Recipe.deleteMany({}).then(() => {
    return Recipe.create({
      title: "Chocolate Tart",
      estimatedTime: 20,
      link: "https://deliciouslyella.com/recipes/baked-banana-blueberry-oatmeal/",
      ingredients: "Sugar, White Flour, Eggs, Chocolate, Baking Soda",
      making: "Pour everything together and put in the oven for 45 minutes."
    });
  }).then(recipe => console.log(recipe.title)).then(() => {
    return Recipe.create({
      title: "Beet Root Risotto",
      estimatedTime: 40,
      link: "https://deliciouslyella.com/recipes/baked-banana-blueberry-oatmeal/",
      ingredients: "Beet Root, Onions, Risotto Rice, White Wine, Tahin",
      making: "Shop the onions, roast them with the Rice, put water in it, cook, eat."
    });
  }).then(recipe => console.log(recipe.title)).then(() => {
    return Recipe.create({
      title: "Spargel Kartoffel Pfanne",
      estimatedTime: 10,
      link: "https://deliciouslyella.com/recipes/baked-banana-blueberry-oatmeal/",
      ingredients: "Grüner Spargel, Kartoffeln, Erbsen, Zitrone, Rucola",
      making: "Koche die Kartoffeln, brate den Spargel an mit den Erbsen, würze mit Zitrone, mixe alles zusammen."
    });
  }).then(recipe => console.log(recipe.title)).catch(error => console.log(error.message)).then(() => {
    console.log("DONE");
    mongoose.connection.close();
  });
