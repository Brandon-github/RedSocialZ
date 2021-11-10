<?php

$router = new \Bramus\Router\Router();

$router->get('/', 'homeController@welcome');

$router->post('/user/start', 'userController@start');

$router->post('/user/save', 'userController@save');

$router->get('/signup', 'userController@signup');

$router->get('/login', 'userController@login');

$router->get('/logout', 'userController@logout');

// error 404
$router->set404(function () {
    View::error404();
});

$router->run();