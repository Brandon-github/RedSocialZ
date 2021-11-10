<?php

function input($name) {
    $input = json_decode(file_get_contents("php://input"), true);
    
    if (isset($input[$name])) {
        return $input[$name];
    } else if(isset($_POST[$name])) {
        return $_POST[$name];
    } else if(isset($_GET[$name])) {
        return $_GET[$name];
    } else {
        return null;
    }
}