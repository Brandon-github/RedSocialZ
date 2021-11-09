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
        $db->query('SET CHARSETS UTF-8');

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


?>