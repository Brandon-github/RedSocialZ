<?php

Class Follower extends Orm {
    protected static $table = 'followers';

    static function isFollowed($id) {
        return self::sql("SELECT * FROM :table WHERE user_id={$id} AND follower_id={$_SESSION['user']->id};", Orm::FETCH_ONE);
    }
}