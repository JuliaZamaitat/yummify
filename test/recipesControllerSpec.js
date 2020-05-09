const chai = require("chai"),
{ expect } = chai,
recipesController = require(".././controllers/recipesController"),
chaiHTTP = require("chai-http"),
app = require("../main"),
Recipe = require( '../models/recipe' );
process.env.NODE_ENV = 'test';

chai.use(chaiHTTP);

describe("recipesController", () => {

  describe("/ GET", () => {
    it("it should GET all the recipes", done => {
      chai
      .request(app) //sets up an web server running at port 3001
      .get("/")
      .end((errors, res) => {
        expect(res).to.have.status(200);
        expect(errors).to.be.equal(null);
        done();
      });
    });
  });


  describe("getRecipeParams", () => {
    it("should convert request body to contain the attributes of the recipe object", () => {
      var body = {
        title: "Tomatensalat",
        estimatedTime: 20,
        link: "",
        ingredients: "Tomaten, Zwiebeln, Salz, Kräuter, Olivenöl, Basilikum, Zitrone, Honig",
        making: "Tomaten & Zwiebeln kleinschneiden, Dressing aus den übrigen Zutaten erstellen"
      };
      expect(recipesController.getRecipeParams(body))
      .to.deep.include({
        title: "Tomatensalat"
      });
    });

    it("should return an empty object with empty request body input", () => {
      var emptyBody = {};
      expect(recipesController.getRecipeParams(emptyBody))
      .to.deep.include({});
    });
  });


  describe("updateRecipeParams", () => {
    it("should update update a recipe with the new params", (done) => {
      let testRecipe = new Recipe({
        title: "Tomatensauce",
        estimatedTime: 10,
        link: "",
        ingredients: "Tomaten, Zwiebeln, Salz, Kräuter, Olivenöl, Basilikum, Zitrone, Honig",
        making: "Tomaten & Zwiebeln kleinschneiden und alles miteinander einkochen."
      });
      testRecipe.save()
      .then( () => {
        var params = {
          title: "Lasagne",
          estimatedTime: 10,
          link: "",
          ingredients: "Tomaten, Zwiebeln, Salz, Kräuter, Olivenöl, Basilikum, Zitrone, Honig",
          making: "Tomaten & Zwiebeln kleinschneiden und alles miteinander einkochen."
        };
        chai
        .request(app)
        .post("/" + testRecipe.id)
        .send(params)
        .end((errors, res) => {
          if (errors) console.log("Unsere Fehler:" + errors);

          expect(res).to.have.status(200);
          // expect(res.body).to.be.a('object');
          // expect(res.body).to.not.equal({});
          // expect(errors).to.be.equal(null);
          // expect(res.body).to.have.property('title');

          // res.body.should.have.property('title');
          // res.body.should.have.property('title').eql("Lasagne");

          Recipe.findById(testRecipe.id)
          .exec()
          .then((recipe) => {
            expect(recipe).to.have.property('title').eql("Lasagne");
          done();

        });
      });
    });
    });

  });


});
