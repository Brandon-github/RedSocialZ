<?php
require_once 'models/User.php';

class userController
{
    public function register()
    {
        require_once './views/auth/register.php';
    }

    public function login()
    {
        require_once './views/auth/login.php';
    }
}


?>