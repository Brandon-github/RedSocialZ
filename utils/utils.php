<?php

function requiresAuth() {
    if(!isset($_SESSION['user'])){
        redirect('login');
    }
}

require_once __DIR__ . '/View.php';
require_once __DIR__ . '/redirect.php';
require_once __DIR__ . '/orm.php';
require_once __DIR__ . '/input.php';
require_once __DIR__ . '/fromNow.php';
require_once __DIR__ . '/Hashids.php';