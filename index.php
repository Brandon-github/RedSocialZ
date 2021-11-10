<?php

// Inicia sesion e incluye archivos de ayuda
session_start();
ob_start();

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/errorhandler.php';

require_once './autoload.php';
require_once  './config/db.php';
require_once './config/parameters.php';
require_once './helpers/helpers.php';

require_once __DIR__ . '/config/twig.php';
require_once __DIR__ . '/utils/utils.php';
require_once __DIR__ . '/config/router.php';