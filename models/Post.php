<?php

use LitEmoji\LitEmoji;

class Post extends Orm {
    protected static $table = 'posts';

    #filtro
    protected function filterIn_dates($data) {
        $data['updated_at'] = gmdate("Y-m-d H:i:s");

        // filtro de emojis
        $data['content'] = LitEmoji::encodeShortcode($data['content']);
        $data['description'] = LitEmoji::encodeShortcode($data['description']);
        $data['key_secret'] = LitEmoji::encodeShortcode($data['key_secret']);
        
        # hash de la contraseña
        // $data['key_secret'] = password_hash($this->getConnection()->real_escape_string($data['key_secret']), PASSWORD_BCRYPT);
        
        return $data;
    }
    
    static function getAll($limit = 5, $offset = 0) {

        # all posts
        return Post::sql("SELECT * FROM :table ORDER BY created_at DESC LIMIT {$offset}, {$limit}");
    }
    
    static function getUserPosts($userid, $limit = 5, $offset = 0) {
        # retorna solo los posts del usuario
        return Post::sql("SELECT * FROM :table WHERE user_id = {$userid} ORDER BY created_at DESC LIMIT {$offset}, {$limit}");
    }

    static function getNumberOfUserPosts($id) {
        return count(self::sql("SELECT * FROM :table WHERE user_id = {$id}"));
    }

    protected function filterOut () {
        $this->user = UserModel::retrieveByPK(isset($this->user_id) ? $this->user_id : 1); # obtiene el usuario de cada post con el user_id

        if (isset($this->key_secret)) {
            # verifica si la publicacion es secreta
            $this->isSecret = $this->key_secret ? true : false;
        
            # si el post es secreto comprueba si este ya fue desbloqueado por el usuario
            if ($this->isSecret) {
                $this->unlocked = Attempt::isUnlocked($this->id);
            }
        }

        if (isset($this->id)) {
            # cuenta los likes
            $this->likes = Like::sql("SELECT COUNT(*) as total FROM `likes` WHERE post_id = 10;", Orm::FETCH_ONE)->total;

            # comprueba si el usuario de la sesion le dio like
            $this->liked = Like::sql("SELECT COUNT(*) as liked FROM likes WHERE post_id = {$this->id} AND user_id = {$_SESSION['user']->id};", Orm::FETCH_ONE)->liked;
        }
    }

}