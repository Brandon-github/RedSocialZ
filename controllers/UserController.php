<?php
//Archivos de modelo usuario y token
require_once 'models/User.php';
require_once 'models/Token.php';

//Incluir archivos para reincio de contraseña
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require './Mail/Exception.php';
require './Mail/PHPMailer.php';
require './Mail/SMTP.php';

class userController
{
    //vistas
    public function signup()
    {
        if (!isset($_SESSION['user'])) {
            View::render('@pages/signup.twig', ['errors' => isset($_SESSION['errors']) ? $_SESSION['errors'] : '']);
            unset($_SESSION['errors']);
        } else {
            redirect('');
        }
    }

    public function login()
    {
        if (!isset($_SESSION['user'])) {
            View::render('@pages/login.twig', ['errors' => isset($_SESSION['errors']) ? $_SESSION['errors'] : '']);
            unset($_SESSION['errors']);
        } else {
            redirect('');
        }
    }

    public function recover_password()
    {
        if (!isset($_SESSION['user'])) {
            View::render('@pages/recover_password.twig', ['errors' => isset($_SESSION['errors']) ? $_SESSION['errors'] : '']);
            unset($_SESSION['errors']);
        } else {
            redirect('');
        }
    }

    public function form_password()
    {
        if (!isset($_SESSION['user']) && isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] == BASE_URL . 'forgot-password' || $_SERVER['HTTP_REFERER'] == BASE_URL . 'form/recover-password') {
            View::render('@pages/recover_password_form.twig', ['errors' => isset($_SESSION['errors']) ? $_SESSION['errors'] : '']);
            unset($_SESSION['errors']);
        } else {
            redirect('');
        }
    }

    public function new_password()
    {
        if (!isset($_SESSION['user']) && isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] == BASE_URL . 'form/recover-password' || $_SERVER['HTTP_REFERER'] == BASE_URL . 'form/new/password') {
            View::render('@pages/new_password.twig', ['errors' => isset($_SESSION['errors']) ? $_SESSION['errors'] : '', 'data' => isset($_SESSION['data']) ? $_SESSION['data'] : '']);
            unset($_SESSION['errors']);
        } else {
            redirect('');
        }
    }

    //Metodo del registro del usuario
    public function save()
    {
        if (isset($_POST) && $_SERVER['HTTP_REFERER'] == BASE_URL . 'signup') {
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
            if (isset($_POST['name']) && strlen($_POST['name']) >= 3 && is_string($_POST['name'])) {

                $name = sanitizeString($_POST['name'], $user->db);
            }

            if (isset($_POST['surname']) && strlen($_POST['surname']) >= 3 && is_string($_POST['surname'])) {

                $surname = sanitizeString($_POST['surname'], $user->db);
            }

            if (isset($_POST['username']) && strlen($_POST['username']) >= 3 && is_string($_POST['username'])) {

                $username = sanitizeString($_POST['username'], $user->db);
            }

            $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);

            if ($name && $surname && $username && $email && $password === $confirm_password && strlen($password) <= 255 && strlen($password) >= 3) {
                $user->setName($name);
                $user->setSurname($surname);
                $user->setUsername($username);
                $user->setEmail($email);
                $user->setPassword($password);

                $query = $user->save();

                //Ver errores en la consulta
                if ($query != false && $query != null) {
                    $error = true;
                    if (is_numeric($query)) {

                        if ($query == 1062) {
                            $error = true;
                            $_SESSION['errors'][1602] = 'El nombre de usuario o correo ya fueron registrados.';
                        }
                    } elseif (is_object($query)) {
                        $error = false;
                        $_SESSION['user'] = $query;
                    }

                    if ($error == false) {
                        redirect('');
                    } else {
                        redirect('signup');
                    }
                } else {
                    $_SESSION['errors']['validate'] = 'Ha ocurrido un error, revise que todos los datos esten escritos correctamente y que las contraseñas coindican';
                    redirect('signup');
                }
            } else {
                $_SESSION['errors']['validate'] = 'Ha ocurrido un error, revise que todos los datos esten escritos correctamente y que las contraseñas coindican';
                redirect('signup');
            }
        } else {
            redirect('');
        }
    }

    //Funcion de login
    public function start()
    {
        if (isset($_POST) && $_SERVER['HTTP_REFERER'] == BASE_URL . 'login') {
            $user = new User();

            $password = sanitizeString($_POST['password'], $user->db);
            $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);


            if ($email && strlen($password) <= 255) {
                $user->setEmail($email);
                $user->setPassword($password);

                $login = $user->login();

                if (is_object($login)) {
                    $_SESSION['user'] = $login;
                    redirect('');
                } else {
                    redirect('login');
                }
            }
        }
    }

    //Funcion de cerrado de sesion
    public function logout()
    {
        if (isset($_SESSION['user'])) {
            unset($_SESSION['user']);
        }

        redirect('');
    }

    //Funcion de actualizacion de datos
    public function update()
    {
        if (Helper::isUser()) {
            View::render('@pages/update.twig', ['user' => $_SESSION['user'], 'errors' => isset($_SESSION['errors']) ? $_SESSION['errors'] : '']);

            unset($_SESSION['errors']);
        } else {
            redirect('login');
        }
    }

    public function saveUpdate()
    {
        //Validar usuario y redireccion
        if (Helper::isUser() && isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] == BASE_URL . 'user/update') {
            //Objeto para escapar caracteres
            $user = new User();

            $name = !empty($_POST["name"]) ? sanitizeString($_POST["name"], $user->db) : false;
            $surname = !empty($_POST['surname']) ? sanitizeString($_POST['surname'], $user->db) : false;
            $username = !empty($_POST['username']) ? sanitizeString($_POST['username'], $user->db) : false;
            $biography = $_POST['biography'] ? sanitizeString($_POST['biography'], $user->db) : false;
            $image = $_FILES['image'] ? $_FILES['image'] : false;
            $email = !empty($_POST['email']) ? filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) : false;

            if ($image && ($image['type'] == 'image/jpeg' || $image['type'] == 'image/jpg' || $image['type'] == 'image/png')) {
                $unique_name = time() . $image['name'];

                if (file_exists('./images/' . $_SESSION['user']->image_uuid) && $_SESSION['user']->image_uuid != 'default.jpg') {
                    unlink('./images/' . $_SESSION['user']->image_uuid);
                }

                if (!move_uploaded_file(
                    $_FILES['image']['tmp_name'],
                    __DIR__ .  '/../images/' . $unique_name        
                ))

                //Objeto para guardar en la base de datos
                $user = new User();
                $user->setName($name);
                $user->setSurname($surname);
                $user->setUsername($username);
                $user->setBiography($biography);
                $user->setImage($unique_name);
                $user->setEmail($email);
                $query = $user->update(true);
            } else {
                $user->setName($name);
                $user->setSurname($surname);
                $user->setUsername($username);
                $user->setBiography($biography);
                $user->setEmail($email);
                $query = $user->update(false);
            }

            if (is_object($query)) {
                $_SESSION['user'] = $query;
                $_SESSION['errors']['false'] = '¡Datos actualizados correctamente!';
            } elseif (is_int($query) && $query == 1062) {
                $_SESSION['errors'][1062] = "El nombre de usuario o correo electrónico ya fueron registrados.";
            } else {
                $_SESSION['errors']['true'] = '¡Ups! ha ocurrido un error, por favor intentelo de nuevo más tarde.';
            }

            redirect('user/update');
        } else {
            redirect('');
        }
    }

    public function forgot_password()
    {
        if (isset($_POST) && isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] == BASE_URL . 'forgot-password') {
            $email = !empty($_POST['email']) ? filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) : false;

            if ($email) {
                //crear usuario y hacer consulta
                $user = new User();
                $user->setEmail($email);

                $confim_email = $user->confirm_email();

                if ($confim_email) {
                    $token =  generateRandomInt(); //Generar token

                    //Generar fecha de expiración del token

                    $tomorrow = date('d') + 1;
                    $expired_at = date("Y-m-$tomorrow h:i:s");

                    //Configurar el email
                    $mail = new PHPMailer(true);

                    //Server settings
                    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
                    $mail->isSMTP();
                    $mail->Host       = 'smtp.gmail.com';
                    $mail->SMTPAuth   = true;
                    $mail->Username   = 'SocialCubeApp@gmail.com';
                    $mail->Password   = 'SocialCubeApp-11-11-21';
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                    $mail->Port       = 465;

                    //Recipients
                    $mail->setFrom('SocialCubeApp@gmail.com', 'SocialCube');
                    $mail->addAddress($email);

                    //Content

                    $url = BASE_URL . 'form/recover-password';
                    $mail->isHTML(true);
                    $mail->Subject = "[SocialCube] reestablecer contraseña";
                    $mail->Body    = "
                        <h2>Se solicitó un restablecimiento de contraseña para $email</h2>
                        <hr>
                        <h3 style='font-size: 40px'>Tu código es: $token</h3>
                        <hr>
                        <b>Si no usas este código dentro de las siguientes 24 horas expirará. Para obtener un nuevo código visita $url</b>
                        
                        <h2>De parte de: SocialCube :)</h2>
                        ";

                    if ($mail->send()) {
                        $newToken = new Token();
                        $newToken->setToken($token);
                        $newToken->setExpired_at($expired_at);
                        $newToken->setUser_email($email);
                        $newToken->save();

                        $_SESSION['errors']['false'] = "Enlace de reestablecimiento de contraseña enviado correctamente";{
                        redirect('form/recover-password');
                        }
                    }
                    //Fin de la configuracion del email

                } else {
                    $_SESSION['errors']['true'] = 'No se encontro ningún usuario con el email ' . $email;
                }
            } else {
                $_SESSION['errors']['true'] = 'Email no válido';
            }
        }

        redirect('forgot-password');
    }
    
    public function validate_token()
    {
        if(isset($_POST) && isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] == BASE_URL . 'form/recover-password')
        {
            $token = isset($_POST['token']) && (int) $_POST['token'] ? $_POST['token'] : false;

            if($token)
            {
                if(strlen($token) == 6)
                {
                    $token = (int) $token;

                    $newToken = new Token();
                    $newToken->setToken($token);
                    $search = $newToken->search();
                    
                    if($search)
                    {
                        $_SESSION['data'] = $search;
                        redirect('form/new/password');
                    }
                    else
                    {
                        $_SESSION['errors']['token']  = "No se pudo encontrar al código " . $token . " para reestablecer la contraseña";
                    }

                }
                else
                {
                    $_SESSION['errors']['token']  = "El código tiene máximo 6 carácteres";
                }
            }
            else
            {
                $_SESSION['errors']['token'] = "El código debe tener solo números";
            }
        }
        else
        {
            redirect('');
        }

        redirect('form/recover-password');
    }

    //Funcion de validacion de cambio de contraseña
    public function change_password()
    {
        if(isset($_POST) && isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] == BASE_URL . 'form/new/password')
        {
            if(isset($_SESSION['data']))
            {
                $password = $_POST['password'];
                $confirm_password = $_POST['repeat-password'];

                if($password === $confirm_password && strlen($password) >= 3)
                {
                    $user = new User();
                    $user->setPassword($password);
                    $user->setEmail($_SESSION['data']->user_email);
                    $query = $user->reset_password();

                    if(is_object($query))
                    {
                        $_SESSION['user'] = $query;
                    }

                }
                else
                {
                    $_SESSION['errors']['password'] = "Las contraseñas no coinciden";
                    redirect('form/new/password');
                }

            }
        }

        redirect('');
    }

    public function showInfo()
    {
        if(Helper::isUser())
        {
            View::render('@pages/profile.twig', ['user' => $_SESSION['user'], 'errors' => isset($_SESSION['errors']) ? $_SESSION['errors'] : '']);
                
            unset($_SESSION['errors']);
        }
        else
        {
            redirect('');
        } 
    }
}

