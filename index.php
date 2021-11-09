<?php
//Inicar sesion e incluir archivos de ayuda
session_start();
ob_start();
require_once 'autoload.php';
require_once 'config/db.php';
require_once './config/parameters.php';
require_once './helpers/helpers.php';


require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/twig.php';
// importa toda las utilidades
require_once __DIR__ . '/utils/utils.php';

if (isset($_GET['c'])) {
    $nameController = $_GET['c'] . "Controller";
    if (class_exists($nameController)) {
        $controller = new $nameController;

        if (isset($_GET['a']) && method_exists($controller, $_GET['a'])) {
            $action = $_GET['a'];

            $controller->$action();
        } else {
            // pagina de error 404
            View::error404();
        }
    } else {
        // pagina de error 404
        View::error404();
    }
} else if (!isset($_SESSION['user'])) {
    header('Location: user/signup');
}
else if(isset($_SESSION['user']) && !isset($_GET['c']))
{
    header('Location: ' . BASE_URL . 'home/welcome');
}
