<?php

use Symfony\Component\VarDumper\Caster\ClassStub;

Orm::useConnection(DB::connect(), 'SocialCube');

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
        }
    }
}