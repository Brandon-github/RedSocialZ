<?php

class User
{
    private $name;
    private $surname;
    private $username;
    private $email;
    private $password;
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

    public function save()
    {
        //Guardar usuario en la base de datos
        $result = false;
        $password = $this->getPassword();

        $check = $this->db->query("SELECT * FROM users WHERE email='{$this->email}'");

        if($check->num_rows == 0)
        {
            $query = $this->db->query("INSERT INTO users VALUES(null, '{$this->name}', '{$this->surname}', '{$this->username}', '{$this->email}', '{$password}', null, NOW(), NOW())");
            $newUser = $this->db->query("SELECT * FROM users WHERE email='{$this->email}'");

            if($query)
            {
                return $newUser->fetch_object();
            }else
            {
                return $result;
            }
        }
        else
        {
            return 1505;
        }
    
    }
}
