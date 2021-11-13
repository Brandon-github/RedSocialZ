<?php

class Token
{
    private $token;
    private $expired_at;
    private $user_email;
    public $db;

    public function __construct()
    {
        $this->db = Db::connect();
    }

    /**
     * Set the value of token
     *
     * @return  self
     */ 
    public function setToken($token)
    {
        $this->token = $token;

        return $this;
    }

    /**
     * Set the value of expired_at
     *
     * @return  self
     */ 
    public function setExpired_at($expired_at)
    {
        $this->expired_at = $expired_at;

        return $this;
    }

    /**
     * Set the value of user_email
     *
     * @return  self
     */ 
    public function setUser_email($user_email)
    {
        $this->user_email = $user_email;

        return $this;
    }

    //Inserta el nuevo token
    public function save(): void
    {
        $query = $this->db->query("INSERT INTO reset_password_token VALUES(null, {$this->token}, '{$this->expired_at}', '{$this->user_email}')");
    }

    //busca el nuevo token en la  base de datos
    public function search()
    {
        $query = $this->db->query("SELECT * FROM reset_password_token WHERE token = {$this->token} AND expired_at >= NOW();");

        if($query->num_rows == 1)
        {
            return $query->fetch_object();
            $this->db->query("DELETE FROM reset_password_token WHERE token = {$this->token}");
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
?>