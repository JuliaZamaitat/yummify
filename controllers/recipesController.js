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
