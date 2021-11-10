<?php

require_once 'models/User.php';

class userController
{
    //vistas
    public function signup()
    {
        if(!isset($_SESSION['user']))
        {
            View::render('@pages/signup.twig', ['errors' => isset($_SESSION['errors']) ? $_SESSION['errors'] : '']);
            unset($_SESSION['errors']);
        }
        else
        {
            redirect('');
        }
    }

    public function login()
    {
        if(!isset($_SESSION['user']))
        {
            View::render('@pages/login.twig', ['errors' => isset($_SESSION['errors']) ? $_SESSION['errors'] : '']);
            unset($_SESSION['errors']);
        }
        else
        {
            redirect('');
        }
    }

    //Metodo del registro del usuario
    public function save()
    {  
        if(isset($_POST) && $_SERVER['HTTP_REFERER'] == BASE_URL . 'signup')
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

            if($name && $surname && $username && $email && $password === $confirm_password && strlen($password) <= 255)
            {
                $user->setName($name);
                $user->setSurname($surname);
                $user->setUsername($username);
                $user->setEmail($email);
                $user->setPassword($password);

                $query = $user->save();

                //Ver errores en la consulta
                if($query != false && $query != null)
                {
                    $error = true;
                    if(is_numeric($query))
                    {
                        
                        if($query == 1062)
                        {
                            $error = true;
                            $_SESSION['errors'][1602] = 'El nombre de usuario o correo ya fueron registrados.';
                        }

                    }
                    elseif(is_object($query))
                    {
                        $error = false;
                        $_SESSION['user'] = $query;
                    }

                    if($error == false)
                    {
                        redirect('');
                    }else
                    {
                        redirect('signup');
                    }
                    
                }
                else
                {
                    $_SESSION['errors']['validate'] = 'Ha ocurrido un error, revise que todos los datos esten escritos correctamente y que las contraseñas coindican';
                    redirect('signup');
                }

            }
            else
            {
                $_SESSION['errors']['validate'] = 'Ha ocurrido un error, revise que todos los datos esten escritos correctamente y que las contraseñas coindican';
                redirect('signup');
            }


        }else
        {
            redirect('');
        }
    }

    //Funcion de login
    public function start()
    {
        if(isset($_POST) && $_SERVER['HTTP_REFERER'] == BASE_URL . 'login'){
            $user = new User();

            $password = sanitizeString($_POST['password'], $user->db);
            $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);


            if($email && strlen($password) <= 255)
            {
                $user->setEmail($email);
                $user->setPassword($password);

                $login = $user->login();
            
                if(is_object($login))
                {
                    $_SESSION['user'] = $login;
                    redirect('');
                }else
                {
                    redirect('login');
                }
            
            }
        }
    }
    
    //Funcion de cerrado de sesion
    public function logout()
    {
        if(isset($_SESSION['user']))
        {
            unset($_SESSION['user']);
        }

        redirect('signup');
    }

    //Funcion de actualizacion de datos
    public function update()
    {
        if(Helper::isUser())
        {
            View::render('@pages/update.twig', ['user' => $_SESSION['user']]);
        }
        else
        {
            redirect('');
        }
    }

    public function saveUpdate()
    {
        //Validar usuario y redireccion
        if(Helper::isUser() && $_SERVER['HTTP_REFERER'] == BASE_URL . 'user/update')
        {
            if($_POST['password'] == $_POST['repeat-password'])
            {
                $name = !empty($_POST["name"]) ? $_POST["name"] : false;
                $surname = !empty($_POST['surname']) ? $_POST['surname'] : false;
                $username = !empty($_POST['username']) ? $_POST['username'] : false;
                $biography = $_POST['biography'] ? $_POST['biography'] : false;
                $image = $_POST['image'] ? $_POST['image'] : false;
                $email = !empty($_POST['email']) ? $_POST['email'] : false;

            

            }
        }
        else
        {
            redirect('');
        }
    }
}


?>