<?php

Class UserModel extends Orm {
    protected static $table = 'users';
}

class Post extends Orm {
    protected static $table = 'posts';

    #filtro
    protected function filterIn_dates($data) {
        $data['updated_at'] = gmdate("Y-m-d H:i:s");
        
        # hash de la contraseña
        // $data['key_secret'] = password_hash($this->getConnection()->real_escape_string($data['key_secret']), PASSWORD_BCRYPT);
        
        return $data;
    }
    
    static function getAll($limit = 10) {
        # all posts
        return Post::sql("SELECT * FROM :table ORDER BY created_at DESC");
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
            $this->likes = $this->sql("SELECT COUNT(*) as total FROM likes WHERE post_id = {$this->id}", Orm::FETCH_ONE)->total;

            # comprueba si el usuario de la sesion le dio like
            $this->liked = $this->sql("SELECT COUNT(*) as liked FROM likes WHERE post_id = {$this->id} AND user_id = {$_SESSION['user']->id};", Orm::FETCH_ONE)->liked;
        }
    }
}