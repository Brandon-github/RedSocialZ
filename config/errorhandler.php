<?php

use const config\DEVELOPMENT;

// Muestra errores si el proyecto esta en modo desarrollo
if (DEVELOPMENT) {
    $run = new \Whoops\Run;
    $handler = new \Whoops\Handler\PrettyPageHandler;
    
    $handler->setPageTitle("Whoops! There was a problem.");
    
    $run->pushHandler($handler);
    
    $run->register();
}