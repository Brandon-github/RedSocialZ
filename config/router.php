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

$router->get('/user/profile', 'UserController@show_profile');

$router->get('/messages', 'UserController@message');

// posts
$router->get('/new', 'PostController@form');

$router->post('/new', 'PostController@create');

$router->get('/post/how-it-works', 'PostController@info');

$router->get('/p/{id}', 'PostController@page');

$router->get('/api/like', 'ApiController@like');
$router->post('/api/unlock', 'ApiController@unlock');
$router->get('/api/content', 'ApiController@content');
$router->get('/api/follow', 'ProfileController@follow');

//Perfiles de usuarios
$router->get('/account/{nickname}/{id}', 'FollowerController@account');

$router->get('/@(\w+)', 'ProfileController@profile');

//Añadir y eliminar seguidores
$router->post('/add_follower', 'FollowerController@add');
$router->post('/delete_follower', 'FollowerController@delete');

// error 404
$router->set404(function () {
    View::error404();
});

$router->run();