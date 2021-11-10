<?php

require_once __DIR__ . '/../models/Post.php';

class homeController
{
    public function welcome() {
        if(Helper::isUser() == true) {
            $posts = Post::getAll();
            
            View::render('@pages/index.twig', [
                'name' => $_SESSION['user']->name,
                'posts' => $posts
            ]);
        }else
        {
            redirect('login');
        }
    }
}

?>