<?php
function controllers_autoload($class_name)
{
    include 'controllers/'.$class_name.'.php';
}

spl_autoload_register('controllers_autoload')

?>