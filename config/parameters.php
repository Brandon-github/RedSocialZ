<?php
//Funciones extras

define('BASE_URL', 'localhost/RedSocialZ/');


function sanitizeString($var, $connection)
{
    $var = strip_tags($var);
    $var = htmlentities($var);
    $var = stripslashes($var);
    return $connection->real_escape_string($var);
}
