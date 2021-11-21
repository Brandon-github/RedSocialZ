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
            'posts' => Post::getUserPosts($userData->id)
        ]);
    }
}