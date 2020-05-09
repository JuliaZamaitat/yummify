// exports.showPage = (req, res) => {
//   res.render("recipes", { 'page_name' : 'Recipes'});
// }

const Recipe = require("../models/recipe");

exports.getAllRecipes = (req, res) => {
  Recipe.find({})
  .exec()
  .then((recipes) => {
    debugger;

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


exports.updateRecipe = (req, res) => {
  let recipeId = req.params.id,
  recipeParams = {
    title: req.body.title,
    estimatedTime: req.body.estimatedTime,
    link: req.body.link,
    ingredients: req.body.ingredients,
    making: req.body.making
  };
  Recipe.findByIdAndUpdate(recipeId, {
    $set: recipeParams
  })
  .then(recipe => {
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

exports.getRecipeParams = (body) => {
  return {
    title: body.title,
    estimatedTime: body.estimatedTime,
    link: body.link,
    ingredients: body.ingredients,
    making: body.making
  };
};
