<?php

require_once __DIR__ . '/../models/Post.php';

class ProfileController {
    # perfil del usuario
    public function profile($username) {

        # requiere autentificacion
        requiresAuth();

        # obtiene datos del usuario usando su nickname
        $userData = UserModel::retrieveByField('nickname', $username, Orm::FETCH_ONE);

        # si no existe un usuario con el nickname se muestra la vista de error 404
        if (!$userData) View::error404();

        View::render('@pages/profile2.twig', [
            'user' => $userData,
            'data' => [
                'isfollowed' => Follower::isFollowed($userData->id),
                'followers' => Follower::getNumberOfFollowers($userData->id),
                'followed' => Follower::getNumberOfFollowed($userData->id),
                'posts' => Post::getNumberOfUserPosts($userData->id)
            ],
            'posts' => Post::getUserPosts($userData->id)
        ]);
    }

    public function follow() {
        $user_id = input('user');
        $follower_id = $_SESSION['user']->id;

        # si los datos son correctos
        if (!$user_id) return;
        if ($user_id === $follower_id) return;

        $followed = Follower::isFollowed($user_id);

        # comprueba si el usuario ya siguio a esa persona
        if ($followed) {
            # deja de seguir
            Follower::sql("DELETE FROM :table WHERE id={$followed->id}", Orm::FETCH_NONE);
        } else {
            $follower = new Follower();
            $follower->user_id = $user_id;
            $follower->follower_id = $follower_id;
    
            $follower->save();
        }
    }
}