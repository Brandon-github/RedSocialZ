<?php

$router = new \Bramus\Router\Router();

$router->get('/', 'HomeController@welcome');

$router->post('/user/start', 'UserController@start');

$router->post('/user/save', 'UserController@save');

$router->get('/signup', 'UserController@signup');

$router->get('/login', 'UserController@login');

$router->get('/logout', 'UserController@logout');

$router->get('/user/update', 'UserController@update');

// posts
$router->get('/new', 'postController@form');
$router->post('/new', 'postController@create');

$router->get('/p/{id}', 'postController@page');

// error 404
$router->set404(function () {
    View::error404();
});

$router->run();