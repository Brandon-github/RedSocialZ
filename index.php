<?php
//Borra todos los tokens de reinicio de contraseña de la base de datos caducados
$now = date('G');
if($now == '12' || $now == '19')
{
    system('python3 Py/delete.py');
    //system('python Py/delete.py');
}
// Inicia sesion e incluye archivos de ayuda
session_start();
ob_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/errorhandler.php';
require_once __DIR__ . '/utils/utils.php';
require_once __DIR__ . '/models/imports.php';

require_once './autoload.php';
require_once  './config/db.php';
require_once './config/parameters.php';
require_once './helpers/helpers.php';

require_once __DIR__ . '/config/twig.php';
require_once __DIR__ . '/config/router.php';


?>