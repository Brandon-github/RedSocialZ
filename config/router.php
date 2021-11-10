<?php

$router = new \Bramus\Router\Router();

$router->get('/', 'HomeController@welcome');

$router->post('/user/start', 'UserController@start');

$router->post('/user/save', 'UserController@save');

$router->get('/signup', 'UserController@signup');

$router->get('/login', 'UserController@login');

$router->get('/logout', 'UserController@logout');

$router->get('/user/update', 'UserController@update');

// error 404
$router->set404(function () {
    View::error404();
});

$router->run();