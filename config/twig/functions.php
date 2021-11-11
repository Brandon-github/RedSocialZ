<?php

$input = new \Twig\TwigFunction('input', function ($name) {
    return input($name);
});

$fromnow = new \Twig\TwigFunction('fromNow', function ($date) {
    return fromNow($date);
});

$userAvatar = new \Twig\TwigFunction('userAvatar', function ($uuid) {
    if ($uuid === 'default.jpg') {
        return 'https://www.gravatar.com/avatar/' . md5(strtolower(trim($_SESSION['user']->email))) . '?d=mp';
    } else {
        return BASE_URL . 'images/' . $uuid;
    }
});

$twig->addFunction($input);
$twig->addFunction($fromnow);
$twig->addFunction($userAvatar);
