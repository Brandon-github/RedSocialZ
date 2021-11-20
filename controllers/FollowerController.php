<?php

require_once 'models/User.php';

class FollowerController
{
    //metodo para devolver la cuenta de un usuario
    public function account($nickname, $id_user)
    {
        if(Helper::isUser())
        {
            if(!empty($nickname) && !empty($id_user))
            {
                $user = new User();
                $username = sanitizeString($nickname, $user->db);
                $id_user = (int) $id_user;

                if(is_string($username) && $id_user)
                {
                    $query = $user->account($username, $id_user);

                    if(is_object($query))
                    {
                        //Usuario de la página
                        $user = $query;

                        //Usuario del que inicio sesión
                        $main = $_SESSION['user'];

                        //Comprueba si el usuario es el mismo del perfil
                        $isOwned = $_SESSION['user'] == $user ? 1 : 0;

                        ob_start();

                        system('python3 ' . __DIR__ ."/../Py/followers.py view_followers $user->id");
            
                        //Obtener los seguidores de un usuario
                        $followers = ob_get_contents();
            
                        ob_clean();
            
                        system('python3 ' . __DIR__ ."/../Py/followers.py view_following $user->id");
            
                        //Ver a cuantas personas sigue un usuario
                        $following = ob_get_contents();

                        ob_clean();

                        system('python3 ' . __DIR__ ."/../Py/followers.py isset_follower $main->id $user->id");

                        $isset_follower = ob_get_contents();

                        if((int) $isset_follower == 1)
                        {
                            $isset_follower = 1; // si el usuario ya sigue al usuario de la página regresa 1
                        }
                        else
                        {
                            $isset_follower = 0; //de lo contrario regresa 0
                        }


                        ob_end_clean();

                        View::render('@pages/profile.twig', ['user' => $query, 'data' => [$followers, $following], 'isOwned' => $isOwned, 'isset_follower' => $isset_follower]);
                    }
                    else
                    {
                        View::error404();
                    }
                }
                else
                {
                    View::error404();
                }
            }
            else
            {
                View::error404();
            }
        }
        else
        {
            redirect('');
        }
    }

    public function add()
    {
        if(Helper::isUser())
        {
            $follower = (int) $_SESSION['user']->id;
            $following = (int) $_POST['user'];

            system('python3 ' . __DIR__ . "/../Py/followers.py add_follower $follower $following");

        }
    }

    public function delete()
    {
        if(Helper::isUser())
        {
            $follower = (int) $_SESSION['user']->id;
            $following = (int) $_POST['user'];

            system('python3 ' . __DIR__ . "/../Py/followers.py delete_follower $follower $following");
        }
    }

}
