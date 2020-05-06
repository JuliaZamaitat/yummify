// exports.showPage = (req, res) => {
//   res.render("recipes", { 'page_name' : 'Recipes'});
// }

const Recipe = require("../models/recipe");

exports.getAllRecipes = (req, res) => {
  Recipe.find({})
    .exec()
    .then((recipes) => {
      res.render("recipes/index", {
        recipes: recipes,
        page_name: 'Recipes'
      });
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

exports.showRecipe = (req, res) => {
  Recipe.findById(req.params.id)
    .exec()
    .then((recipe) => {
      res.render("recipes/show", {
        recipe: recipe,
        page_name: 'Recipes'
      });
      console.log(req.params.id);
      //console.log(recipe);
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

exports.editRecipe = (req, res) => {
  Recipe.findById(req.params.id)
    .exec()
    .then((recipe) => {
      res.render("recipes/edit", {
        recipe: recipe,
        page_name: 'Recipes'
      });
      console.log(req.params.id);
      console.log(recipe);
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

// Do I need to find the entries or pass them?
exports.updateRecipe = (req, res) => {
  Recipe.findById(req.params.id)
    .exec()
    .then((recipe) => {
      recipe.update({
        title: req.body.title,
        estimatedTime: req.body.estimatedTime
      });
      res.render("recipes/show", {
        recipe: recipe,
        page_name: 'Recipes'
      });
      console.log(req.params.id);
      console.log(recipe);
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
  };
