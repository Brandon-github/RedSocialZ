<?php

// redireccionamiento
function redirect($route) {
    header("Location: " . BASE_URL . $route);
    exit();
}