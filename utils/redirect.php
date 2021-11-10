<?php

// redireccionamiento
function redirect($route) {
    $route = $route === '/' ? '' : $route;
    header("Location: " . BASE_URL . $route);
    exit();
}