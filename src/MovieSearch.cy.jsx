import React from "react";
import MovieSearch from "./MovieSearch";

describe("<MovieSearch />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MovieSearch />);

    // Type search query and click search button
    cy.get('input[type="text"]').type("John Wick");
    cy.contains("Search").click();

    // Check if loading message appears and then disappears
    cy.contains("Loading...").should("exist");
    // cy.contains("No movies found").should("exist");
    //cy.contains("Loading...").should("not.exist");

    // Click on a movie card and check if modal appears
    cy.get(".grid > :nth-child(1)").click();
    cy.contains("John Wick: Chapter 4").should("exist");
    cy.contains("With the price on his head ever increasing").should("exist");

    // Close the modal and check if it disappears
    cy.contains("Close").click();
    cy.contains("John Wick: Chapter 4").should("not.exist");
    cy.contains("With the price on his head ever increasing").should(
      "not.exist"
    );
  });
});
