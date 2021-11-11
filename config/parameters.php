<?php
//Funciones extras

// define('BASE_URL', 'http://localhost:5050/');
define('BASE_URL', 'http://localhost/RedSocialZ/');


function sanitizeString($var, $connection)
{
    $var = strip_tags($var);
    $var = htmlentities($var);
    $var = stripslashes($var);
    $var = html_entity_decode($var);

    return $connection->real_escape_string($var);
}
