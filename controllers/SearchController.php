<?php

require_once 'models/User.php';
require_once 'models/Post.php';

class SearchController
{
    public function users()
    {
        if(isset($_GET['q']) && $_GET['q'] != "")
        {
            $user = new User();

            $query = sanitizeString($_GET['q'], $user->db);

            $search = $user->search($query);

            if($search)
            {
                View::render('@pages/users.twig', ['users' => $search]);
            }

        }
    }
}

?>