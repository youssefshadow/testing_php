<?php
    namespace App\Controller;
    use App\Utils\Fonctions;
    use App\Model\Utilisateur;
    class UtilisateurController extends Utilisateur{
        public function insertUser(){
            $msg = "";
            //Test si le formulaire à été submit
            if(isset($_POST['submit'])){
                //nettoyage des datas du formulaire
                $nom = Fonctions::cleanInput($_POST['nom']);
                $prenom = Fonctions::cleanInput($_POST['prenom']);
                $mail = Fonctions::cleanInput($_POST['mail']);
                $mdp = Fonctions::cleanInput($_POST['mdp']);
                //Test si tous les champs du formulaire sont remplis
                if(!empty($nom) AND !empty($prenom) AND !empty($mail) AND !empty($mdp)){
                    $this->setMail($mail);
                    //Récupération du compte
                    $user = $this->getUserByMail();
                    //Test si le compte n'existe pas en BDD
                    if(!$user){
                        //Set des valeurs et hash du mot de passe
                        $this->setNom($nom);
                        $this->setPrenom($prenom);
                        $this->setPassword(password_hash($mdp, PASSWORD_DEFAULT));
                        //Ajout du compte en BDD
                        $this->addUser();
                        $msg = "Le compte a été ajouté en BDD";
                    }
                    //Test sinon affiche une erreur
                    else{
                        $msg = "Les informations sont incorrectes";
                    }
                }
                else{
                    $msg = "Veuillez remplir tous les champs du formulaire";
                }
            }
            //Import de la vue
            include './App/Vue/vueAddUser.php';
        }

        public function connectUser()
{
    $msg = "";

    // Si le formulaire est soumis
    if (isset($_POST['connexion'])) {
        $mail = Fonctions::cleanInput($_POST['mail']);
        $password = Fonctions::cleanInput($_POST['mdp']);

        // Création d'une instance de la classe Utilisateur
        $user = new Utilisateur();

        // Récupération de l'utilisateur correspondant à l'adresse e-mail
        $user->setMail($mail);
        $result = $user->getUserByMail();

        if (!empty($result)) {
            $db_password = $result[0]->mdp;
            if (password_verify($password, $db_password)) {
                // Enregistrement des données utilisateur dans la session
                $_SESSION['connected'] = true;
                $_SESSION['id'] = $result[0]->id;
                $_SESSION['mail'] = $result[0]->mail;
                
                $msg = "connecté.";

                // header('Location: ./home');
                exit;
            } else {
                $msg =  "Les informations sont incorrectes";
            }
        } else {
            $msg =  "Les informations sont incorrectes";
        }
    }

    // Import de la vue
    include './App/Vue/vueConnectUser.php';
}

        
        
    }
?>

