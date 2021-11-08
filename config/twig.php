<?php

use const config\DEVELOPMENT;
use const config\VERSION;

// deirectorio de las vistas
$templateDir = __DIR__ . '/../testviews';
$loader = new \Twig\Loader\FilesystemLoader($templateDir);

// paths
$loader->addPath($templateDir . '/components', 'components');
$loader->addPath($templateDir . '/pages', 'pages');
$loader->addPath($templateDir . '/layout', 'layout');

// inicializa twig
$twig = new \Twig\Environment($loader, [
    'cache' => __DIR__ . '/temp',
    'auto_reload' => DEVELOPMENT
]);

$twig->addGlobal('appVersion', VERSION);