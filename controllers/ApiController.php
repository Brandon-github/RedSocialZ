<?php

require_once __DIR__ . '/../models/Like.php';

class ApiController {
    public function like() {
        # obtiene el id del usuario
        $userid = $_SESSION['user']->id;
        $postid = input('id');

        # comprueba si el usuario ya le dio like al item
        $liked = Like::sql("SELECT * FROM :table WHERE post_id = {$postid} AND user_id = {$userid}", Orm::FETCH_ONE);

        if ($liked) {
            $like = Like::retrieveByPK($liked->id);
            $like->delete();
        } else {
            $like = new Like();
            $like->post_id = $postid;
            $like->user_id = $userid;

            $like->save();
        }
    }
}