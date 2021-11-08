<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config/twig.php';

// render
echo $twig->render('@pages/index.twig', [
    'name' => 'Frank'
]);