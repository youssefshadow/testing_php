describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost/testing/addUser");
  });

  it("bddInsert", () => {
    cy.visit("http://localhost/testing/addUser");
    cy.get(':input[name="nom"]').type("Bensmimane");
    cy.get(':input[name="prenom"]').type("Youssef");
    cy.get(':input[name="mail"]').type("test@gmail.com");
    cy.get(':input[name="mdp"]').type("1234");

    cy.get(':input[name="submit"]').click();

    cy.get("#msgzone").should("have.text", "Le compte a été ajouté en BDD");
  });

  it("doublon", () => {
    cy.visit("http://localhost/testing/addUser");
    cy.get(':input[name="nom"]').type("Bensmimane");
    cy.get(':input[name="prenom"]').type("Youssef");
    cy.get(':input[name="mail"]').type("youssef2ben@gmail.com");
    cy.get(':input[name="mdp"]').type("1234");

    cy.get(':input[name="submit"]').click();

    cy.get("#msgzone").should("have.text", "Les informations sont incorrectes");
  });

  it("empty", () => {
    cy.visit("http://localhost/testing/addUser");
    cy.get(':input[name="submit"]').click();

    cy.get("#msgzone").should(
      "have.text",
      "Veuillez remplir tous les champs du formulaire"
    );
  });
});
