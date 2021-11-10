<?php

$input = new \Twig\TwigFunction('input', function($name) {
    return input($name);
});
$fromnow = new \Twig\TwigFunction('fromNow', function($date) {
    return fromNow($date);
});

$twig->addFunction($input);
$twig->addFunction($fromnow);