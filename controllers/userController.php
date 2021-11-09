<?php

require_once 'models/User.php';

class userController
{
    public function signup()
    {
        View::render('@pages/signup.twig');
    }

    public function login()
    {
        View::render('@pages/login.twig');
    }

    public function save()
    {
        if(isset($_POST))
        {
            //Variables iniciales
            $name = false;
            $surname = false;
            $username = false;
            $email = false;
            $password = $_POST['password'];
            $confirm_password = $_POST['repeat-password'];

            //Crear objeto usuario
            $user = new User();

            //Validar todos los datos
            if(isset($_POST['name']) && strlen($_POST['name']) >= 3 && is_string($_POST['name']))
            {

                $name = sanitizeString($_POST['name'], $user->db);
            }

            if(isset($_POST['surname']) && strlen($_POST['surname']) >= 3 && is_string($_POST['surname']))
            {

                $surname = sanitizeString($_POST['surname'], $user->db);
            }

            if(isset($_POST['username']) && strlen($_POST['username']) >= 3 && is_string($_POST['username']))
            {

                $username = sanitizeString($_POST['username'], $user->db);
            }

            $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);

            if($name && $surname && $username && $email && $password === $confirm_password)
            {
                $user->setName($name);
                $user->setSurname($surname);
                $user->setUsername($username);
                $user->setEmail($email);
                $user->setPassword($password);

                $query = $user->save();

                if($query != false)
                {
                    if(is_int($query))
                    {
                        $_SESSION['errors']['duplicado'] = true;

                    }
                    elseif(is_object($query))
                    {
                        $_SESSION['user'] = $query;
                    }

                    header('Location: ../home/welcome');
                    
                }

            }


        }
    }
}


?>