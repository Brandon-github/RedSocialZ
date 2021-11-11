<?php

use const config\HASH_ID_SALT;
use LitEmoji\LitEmoji;

require_once __DIR__ . '/../models/Post.php';

class postController
{
    public function form()
    {
        View::render('@pages/post.twig');
    }
    public function create()
    {
        
        # verifica si tiene el parametro type
        if (input('type')) {

            # init para guardar el post
            $post = new Post();
            $post->user_id = $_SESSION['user']->id;
            $post->content = LitEmoji::encodeShortcode(input('content'));
            $post->created_at = gmdate("Y-m-d H:i:s");

            # comprueba si la publicacion es secreta o no
            if (input('type') === 'secret') {
    
                $post->key_secret = input('secret');
                $post->description = input('description');

                $post->save(); # guarda

                redirect('/');

            } else if (input('type') === 'public') {

                $post->save();
                
                redirect('/');
            }
        } else {
            redirect(''); # si no se paso el dato tipo entoces se redirige a la pagina principal
        }
    }
    public function page($hash) {
        $hashids = new Hashids(HASH_ID_SALT);

        # decodifica el hash del id
        $id = $hashids->decode($hash);
        
        # verifica si el hash es valido
        if ($id) {
            $id = $id[0];

            # trae datos del post
            $post = Post::retrieveByPK($id);

            View::render('@pages/p/index.twig', [
                'post' => $post
            ]);
        } else {
            View::error404();
        }
    }

    public function info()
    {
        View::render('@pages/post-info.twig');
    }
}