const mongoose = require("mongoose"),
  recipeSchema = mongoose.Schema({
    title: String,
    estimatedTime: Number,
    link: String,
    // labels: [{type: mongoose.Schema.Types.ObjectId, ref:"Label"}],
    ingredients: String,
    making: String
    // image: {
    //   data: Buffer,
    //   contentType: String
    // }

  });

  module.exports = mongoose.model("Recipe", recipeSchema); //Exports the model
