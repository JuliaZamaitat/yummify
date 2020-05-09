const chai = require("chai"),
  { expect } = chai,
  recipesController = require(".././controllers/recipesController"),
  chaiHTTP = require("chai-http"),
  app = require("../main");

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
});
