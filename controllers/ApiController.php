<?php

use const config\HASH_ID_SALT;

require_once __DIR__ . '/../models/Like.php';
require_once __DIR__ . '/../models/Post.php';

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

    public function unlock() {
        # obtiene el id del usuario
        $userid = $_SESSION['user']->id;
        $postid = input('id');
        $key = input('key');

        $post = Post::retrieveByPK($postid);
        
        $attempt = new Attempt();
        $attempt->post_id = $postid;
        $attempt->user_id = $userid;
        
        if ($key === $post->key_secret) {
            $unlocked = Attempt::isUnlocked($postid);

            # verifica si ya existe una llave de desbloqueo
            if (!$unlocked) {
                $attempt->unlocked = 1;
                $attempt->save();

            }

            $hashids = new Hashids(HASH_ID_SALT);

            # respuesta de la api | json
            echo json_encode(['unlocked' => true, 'url' => $hashids->encode($postid)]);
        } else {
            $attempt->unlocked = 0;
            $attempt->save();
            
            echo json_encode(['unlocked' => false]);
        }
    }
}