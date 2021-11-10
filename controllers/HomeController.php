<?php

class homeController
{
    public function welcome()
    {
        if(Helper::isUser() == true) {
            View::render('@pages/posts.twig', ['BASE_URL' => BASE_URL, 'name' => $_SESSION['user']->name]);
        }else
        {
            redirect('login');
        }
    }
}

?>