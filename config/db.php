<?php
//Clase para la conexión a la base de datos
class DB
{
    //Metodo para la conexión
    public static function connect()
    {
        //Los parametros de la conexión los pueden cambiar a su usuario de sql, yo puse uno que me
        //invente ya que el root me daba problemas
        
        $db = new mysqli('localhost', 'root', 'root', 'SocialCube');

        //$db = new mysqli('ec2-3-88-114-41.compute-1.amazonaws.com', 'admin', 'Mysql@1234', 'SocialCube');
        
        $db->query('SET NAMES utf8');

        if($db)
        {
            return $db;
        }
        else
        {
            return $db->error;
        }
    }
}

// conexcion a la base de datos mediante ORM
Orm::useConnection(DB::connect(), 'SocialCube');

?>