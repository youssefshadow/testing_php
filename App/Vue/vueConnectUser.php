<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Connexion</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }

        .container {

            max-width: 400px;
            margin: 0 auto;
            margin-top:10%;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .container h2 {
            text-align: center;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .form-group input {
            width: 100%;
            margin: auto;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            text-align: center; 
}


        .form-group button {
            width: 100%;
            padding: 10px;
            background-color: #4caf50;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .form-group button:hover {
            background-color: #45a049;
        }

        .error-message {
            color: red;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Connexion</h2>
        <form method="post" action="">
            <div class="form-group">
                <label for="mail">Adresse e-mail</label>
                <input type="email" id="mail" name="mail" required>
            </div>
            <div class="form-group">
                <label for="mdp">Mot de passe</label>
                <input type="password" id="mdp" name="mdp" required>
            </div>
            <div class="form-group">
                <button type="submit" name="connexion">Se connecter</button>
            </div>
            <?php if(!empty($msg)): ?>
                <div class="error-message"><?= $msg ?></div>
            <?php endif; ?>
        </form>
    </div>
</body>
</html>
