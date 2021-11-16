#Este archivo borra los tokens para reestablecer contraseña
#para que funcione correctamente descarguen esta librería https://pypi.org/project/PyMySQL/
import pymysql

class Database:
    def __init__(self):
        self.connection = pymysql.connect(
            host='localhost',
            user='root',
            password='root',
            db='SocialCube'
            #host='ec2-3-88-114-41.compute-1.amazonaws.com'
            #user='admin'
            #password='Mysql@1234'
            #db='SocialCube'
        )

        self.cursor =  self.connection.cursor()

    def delete_tokens(self):
        sql = "DELETE FROM reset_password_token WHERE NOW() > expired_at"

        self.cursor.execute(sql)
        self.connection.commit()


database = Database()
database.delete_tokens()