<?php
//Configuraciones del sitio
session_start();
ob_start();
require_once 'autoload.php';
require_once 'config/db.php';


if(isset($_GET['c']))
{
    $nameController = $_GET['c']."Controller";
    if(class_exists($nameController))
    {
        $controller = new $nameController;

        if(isset($_GET['a']) && method_exists($controller, $_GET['a']))
        {
            $action = $_GET['a'];

            $controller->$action();
        }else
        {
            require_once('./views/errors/404.php');
        }
    }else
    {
        require_once('./views/errors/404.php');
    }
}
else if(!isset($_SESSION['user']))
{
    require_once './views/auth/register.php';
}

?>