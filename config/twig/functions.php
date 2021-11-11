<?php

use const config\HASH_ID_SALT;

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

$hashid = new \Twig\TwigFunction('hashid', function ($id) {
    $hashids = new Hashids(HASH_ID_SALT);
    return $hashids->encode($id);
});

$twig->addFunction($input);
$twig->addFunction($fromnow);
$twig->addFunction($userAvatar);
$twig->addFunction($hashid);
