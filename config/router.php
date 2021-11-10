<?php

$router = new \Bramus\Router\Router();

$router->get('/', function () {
    echo 'About Page Contents';
});

$router->get('/', function () {
    echo 'About Page Contents';
});

$router->set404(function () {
    View::error404();
});

$router->run();