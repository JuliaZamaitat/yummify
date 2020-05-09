"use strict";

process.env.NODE_ENV = 'test';

const Recipe = require( '../models/recipe' ),
  { expect } = require( 'chai' );

require( '../main' ); //In order to use the app instance

beforeEach( done => {
  Recipe.deleteMany( {} )
    .then( () => {
      done();
    } );
} );

describe( 'SAVE recipe', () => {
  it( 'it should save one recipe', ( done ) => {
    let testRecipe = new Recipe( {
      title: "Tomatensauce",
      estimatedTime: 10,
      link: "",
      ingredients: "Tomaten, Zwiebeln, Salz, Kräuter, Olivenöl, Basilikum, Zitrone, Honig",
      making: "Tomaten & Zwiebeln kleinschneiden und alles miteinander einkochen."
    } );
    testRecipe.save()
      .then( () => {
        Recipe.find( {} )
          .then( result => {
            expect( result.length )
              .to.eq( 1 );
            expect( result[ 0 ] )
              .to.have.property( '_id' );
            done(); //to complete the test with promises
          } );
      } );
  } );
} );
