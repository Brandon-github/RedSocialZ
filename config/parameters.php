<?php
//Funciones extras

define('BASE_URL', 'http://localhost:8080/');
// define('BASE_URL', 'http://localhost/RedSocialZ/');


function sanitizeString($var, $connection)
{
    $var = strip_tags($var);
    $var = htmlentities($var);
    $var = stripslashes($var);
    $var = html_entity_decode($var);

    return $connection->real_escape_string($var);
}


function generateRandomInt($length = 6) {
    $characters = '0123456789';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
} 
