<?php

class Helper
{
    public static function isUser() : bool
    {
        if(isset($_SESSION['user']) && is_object($_SESSION['user']))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}


?>