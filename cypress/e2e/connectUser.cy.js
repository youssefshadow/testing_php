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

    cy.get("#msgzone").should("contain", "Les informations sont incorrectes");
  });

  it("invalidEmail", () => {
    cy.visit("http://localhost/testing/connectUser");
    cy.get(':input[name="mail"]').type("invalidemail@gmail.com");
    cy.get(':input[name="mdp"]').type("1234");

    cy.get(':input[name="connexion"]').click();

    cy.contains("#msgzone", "Les informations sont incorrectes").should(
      "be.visible"
    );
  });
});

describe("connexionUtilisateur", () => {
  // Connexion utilisateur API
  it("connexionUser API", () => {
    // Paramétrage de l'API
    const url = "http://localhost/testing/api/addTest";
    const name = "Connexion";
    let date = new Date();
    date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let valid = true;

    const users = [
      {
        nom: "Test1",
        prenom: "Test1",
        mail: "test124@test.fr",
        password: "1234",
      },
      {
        nom: "Test2",
        prenom: "Test2",
        mail: "test125@test.fr",
        password: "1234",
      },
      {
        nom: "Test3",
        prenom: "Test3",
        mail: "test126@test.fr",
        password: "1234",
      },
      {
        nom: "Test4",
        prenom: "Test4",
        mail: "test127@test.fr",
        password: "1234",
      },
      {
        nom: "Benslimane",
        prenom: "Youssef",
        mail: "youssef20ben@gmail.com",
        password: "youyou",
      },
    ];

    cy.visit("http://localhost/testing/connectUser");

    // Boucle pour itérer sur les utilisateurs
    users.forEach((user) => {
      cy.get(':input[name="mail"]').type(user.mail);
      cy.get(':input[name="mdp"]').type(user.password);
      cy.get(':input[name="connexion"]').click();
      cy.wait(2000);

      cy.get("#msgzone")
        .invoke("text")
        .then((text) => {
          // Vérification du message de connexion réussie
          if (text == "Connecté") {
            valid = true;
          }
          // Vérification du message d'autres erreurs
          else {
            valid = false;
          }

          const json = JSON.stringify({ name: name, valid: valid, date: date });

          // Requête API
          cy.request({
            method: "POST",
            url: url,
            body: json,
          });
        });
    });
  });
});
