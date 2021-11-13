<?php

use Bramus\Router\Router;

$router = new \Bramus\Router\Router();

$router->get('/', 'HomeController@welcome');

// usuarios
$router->post('/user/start', 'UserController@start');

$router->post('/user/save', 'UserController@save');

$router->get('/signup', 'UserController@signup');

$router->get('/login', 'UserController@login');

$router->get('/forgot-password', 'UserController@recover_password');

$router->post('/recover-password', 'UserController@forgot_password');

$router->get('/form/recover-password', 'UserController@form_password');

$router->post('/validate-token', 'UserController@validate_token');

$router->get('/logout', 'UserController@logout');

$router->get('/user/update', 'UserController@update');

$router->post('/update', 'UserController@saveUpdate');

$router->get('/form/new/password', 'UserController@new_password');

$router->post('/validate-new-password', 'UserController@change_password');

// posts
$router->get('/new', 'PostController@form');

$router->post('/new', 'PostController@create');

$router->get('/post/how-it-works', 'PostController@info');

$router->get('/p/{id}', 'PostController@page');

$router->get('/api/like', 'ApiController@like');

// error 404
$router->set404(function () {
    View::error404();
});

$router->run();