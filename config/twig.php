<?php

use const config\DEVELOPMENT;
use const config\VERSION;

// deirectorio de las vistas
$templateDir = __DIR__ . '/../views';
$loader = new \Twig\Loader\FilesystemLoader($templateDir);

// paths
$loader->addPath($templateDir . '/components', 'components');
$loader->addPath($templateDir . '/pages', 'pages');
$loader->addPath($templateDir . '/layout', 'layout');

$twig = new \Twig\Environment($loader, [
    'cache' => DEVELOPMENT ? false : __DIR__ . '/temp',
    'auto_reload' => DEVELOPMENT
]);

$twig->addGlobal('appVersion', VERSION);
$twig->addGlobal('BASE_URL', BASE_URL);
$twig->addGlobal('currentUser', isset($_SESSION['user']) ? $_SESSION['user'] : false);

require_once __DIR__ . '/twig/functions.php';