<?php

Class Attempt extends Orm {
    protected static $table = 'attempts';

    # retorna true si existe un registro de itento true pero con la llave true
    static function isUnlocked($postid) {
        return self::sql("SELECT COUNT(*) AS unlocked FROM attempts WHERE post_id = {$postid} AND user_id = {$_SESSION['user']->id} AND unlocked = TRUE;", Orm::FETCH_ONE)->unlocked;
    }
}