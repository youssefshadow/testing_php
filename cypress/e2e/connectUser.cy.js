describe("connexion spec", () => {
  it("bddConnect", () => {
    cy.visit("http://localhost/testing/connectUser");
    cy.get(':input[name="mail"]').type("youssef20ben@gmail.com");
    cy.get(':input[name="mdp"]').type("youyou");

    cy.get(':input[name="connexion"]').click();

    cy.url().should("include", "/home");
  });

  it("wrongPassword", () => {
    cy.visit("http://localhost/testing/connectUser");
    cy.get(':input[name="mail"]').type("test@gmail.com");
    cy.get(':input[name="mdp"]').type("ouassila_Florent");

    cy.get(':input[name="connexion"]').click();

    cy.get(".error-message").should("contain", "Mot de passe incorrect.");
  });

  it("invalidEmail", () => {
    cy.visit("http://localhost/testing/connectUser");
    cy.get(':input[name="mail"]').type("invalidemail@gmail.com");
    cy.get(':input[name="mdp"]').type("1234");

    cy.get(':input[name="connexion"]').click();

    cy.contains(".error-message", "Adresse e-mail incorrecte.").should(
      "be.visible"
    );
  });
});

describe("connexionReussie", () => {
  it("connexionReussie", () => {
    cy.visit("http://localhost/testing/connectUser");
    cy.get(':input[name="mail"]').type("validemail@example.com");
    cy.get(':input[name="mdp"]').type("validpassword");

    cy.get(':input[type="submit"]').click();

    cy.get(".error-message")
      .invoke("text")
      .then((text) => {
        if (text.includes("Connecté")) {
          cy.request("POST", "http://localhost/api/addTest", {
            date: new Date().toISOString(),
            nom: "connexionReussie",
            valid: true,
          });
        } else if (text.includes("Les informations sont incorrectes")) {
          cy.request("POST", "http://localhost/api/addTest", {
            date: new Date().toISOString(),
            nom: "connexionReussie",
            valid: false,
          });
        }
      });
  });
});
