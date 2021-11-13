<?php

class User
{
    private $name;
    private $surname;
    private $username;
    private $email;
    private $password;
    private $image;
    private $biography;
    public  $db;

    //Contructor

    public function __construct()
    {
        $this->db = DB::connect();
    }


    //Generar getter y setter


    /**
     * Get the value of name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get the value of surname
     */
    public function getSurname()
    {
        return $this->surname;
    }

    /**
     * Set the value of surname
     *
     * @return  self
     */
    public function setSurname($surname)
    {
        $this->surname = $surname;

        return $this;
    }

    /**
     * Get the value of username
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set the value of username
     *
     * @return  self
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get the value of email
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @return  self
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get the value of password
     */
    public function getPassword()
    {
        return password_hash($this->db->real_escape_string($this->password), PASSWORD_BCRYPT, ['cost' => 4]);
    }

    /**
     * Set the value of password
     *
     * @return  self
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get the value of biography
     */
    public function getBiography()
    {
        return $this->biography;
    }

    /**
     * Set the value of biography
     *
     * @return  self
     */
    public function setBiography($biography)
    {
        $this->biography = $biography;

        return $this;
    }


    /**
     * Get the value of image
     */ 
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set the value of image
     *
     * @return  self
     */ 
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    public function save()
    {
        //Guardar usuario en la base de datos
        $password = $this->getPassword();

        $query = $this->db->query("INSERT INTO users VALUES(null, '{$this->name}', '{$this->surname}', '{$this->username}', 'default.jpg', '{$this->email}', '{$password}', null, NOW(), NOW())");
        $newUser = $this->db->query("SELECT * FROM users WHERE email='{$this->email}' OR nickname='{$this->username}' ");

        if ($query)
        {
            return $newUser->fetch_object();
        } else {
            return 1062;
        }
    }

    //Metodo para hacer el login del usuario
    public function login()
    {
        $password = $this->password;

        $sql = "SELECT * FROM users WHERE email='{$this->email}'";
        $query = $this->db->query($sql);

        if($query && $query->num_rows == 1)
        {
            //Verificar contraseña
            $user = $query->fetch_object();

            $verify = password_verify($password, $user->password);

            if($verify)
            {
                return $user;
            }
            else
            {
                $_SESSION['errors']['password'] = 'La contraseña no coindice con nuestros registros';
            }

        }
        else
        {
            $_SESSION['errors']['email'] = 'No encontramos ningun usuario con el email ' . $this->email;
        }
    }

    //Funcion para actualizar datos del usuario
    public function update(bool $image_exists)
    {
        $user = $_SESSION['user'];

        //Comprueba si se va a actualizar la imagen
        if($image_exists) // si existe la actualiza
        {
            $query = $this->db->query("UPDATE users SET name='{$this->name}', surname='{$this->surname}', nickname='{$this->username}', image_uuid='{$this->image}', email='{$this->email}', biography='{$this->biography}', updated_at=NOW() WHERE id=" . $user->id);
        }
        else // si no existe entonces no lo actualiza
        {
            $query = $this->db->query("UPDATE users SET name='{$this->name}', surname='{$this->surname}', nickname='{$this->username}', email='{$this->email}', biography='{$this->biography}', updated_at=NOW() WHERE id=" . $user->id);
        }

        if($this->db->errno == 0)
        {
            return $this->db->query("SELECT * FROM users WHERE id=$user->id")->fetch_object();
        }else
        {
            return $this->db->errno;
        }
    }

    public function confirm_email()
    {
        $query = $this->db->query("SELECT * FROM users WHERE email='{$this->email}'");

        if($query->num_rows == 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public function reset_password()
    {
        $password = $this->getPassword();
        $query = $this->db->query("UPDATE users SET password='$password' WHERE email='{$this->email}'");

        if($query)
        {
            $query = $this->db->query("SELECT * FROM users WHERE email='{$this->email}'");

            return $query->fetch_object();
        }
        else
        {
            return false;
        }
    
    }

    public function __destruct()
    {
        $this->db->close();
    }

}
