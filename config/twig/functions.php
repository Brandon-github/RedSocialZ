<?php

$input = new \Twig\TwigFunction('input', function ($name) {
    return input($name);
});

$fromnow = new \Twig\TwigFunction('fromNow', function ($date) {
    return fromNow($date);
});

$userAvatar = new \Twig\TwigFunction('userAvatar', function ($uuid, $email) {
    # si la foto del usuario por defecto comprueba si tiene su correo vinculado en gravatar
    if ($uuid === 'default.jpg') {
        # api de gravatar
        return 'https://www.gravatar.com/avatar/' . md5(strtolower(trim($email))) . '?d=mp';
    } else {
        return BASE_URL . 'images/' . $uuid;
    }
});

$twig->addFunction($input);
$twig->addFunction($fromnow);
$twig->addFunction($userAvatar);
