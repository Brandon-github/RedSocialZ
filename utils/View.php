<?php

use const config\APP_NAME;
use const config\NAME_SEPARATOR;

class View {
    static function render(string $path, $params = []) {
        header('Content-Type:text/html; charset=UTF-8');
        
        // rendiriza con normalidad si es que la solicitud no es un json
        echo self::renderReturn($path, $params);
    }
    static function renderReturn(string $path, $params = []) {
        global $twig;
        return $twig->render($path, $params);
    }
    static function title(string $title): string {  
        return $title . NAME_SEPARATOR . APP_NAME;
    }
    static function error404() {
        http_response_code(404);
        return self::render('@pages/errors/404.twig');
    }
}