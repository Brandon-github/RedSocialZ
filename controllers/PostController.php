<?php

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
            $post->content = input('content');
            $post->created_at = gmdate("Y-m-d H:i:s");

            # comprueba si la publicacion es secreta o no
            if (input('type') === 'secret') {
    
                $post->key_secret = input('secret');
                $post->description = input('description');
                $post->is_secret = 1;
    
                var_dump($post);

                $post->save(); # guarda

                redirect('/');

            } else if (input('type') === 'public') {
                
                $post->is_secret = 0;
                $post->save();
                
                redirect('');
            }
        } else {
            redirect(''); # si no se paso el dato tipo entoces se redirige a la pagina principal
        }
    }
}
