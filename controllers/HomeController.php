<?php

require_once __DIR__ . '/../models/Post.php';

class homeController
{
    public function welcome() {
        if(Helper::isUser() == true) {
<<<<<<< HEAD:controllers/homeController.php
            $posts = Post::getAll();
            
            View::render('@pages/index.twig', [
                'name' => $_SESSION['user']->name,
                'posts' => $posts
            ]);
=======
            View::render('@pages/posts.twig', ['BASE_URL' => BASE_URL, 'name' => $_SESSION['user']->name]);
>>>>>>> 8e208a90738e358c42d82c01381a0ddf506a5393:controllers/HomeController.php
        }else
        {
            redirect('login');
        }
    }
}

?>