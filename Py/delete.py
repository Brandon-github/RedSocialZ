#Este archivo borra los tokens para reestablecer contraseña
#para que funcione correctamente descarguen esta librería https://pypi.org/project/PyMySQL/
import database

class Token(database.Database):
    def delete_tokens(self):
        sql = "DELETE FROM reset_password_token WHERE NOW() > expired_at"

        self.cursor.execute(sql)
        self.connection.commit()


database = Token()
database.delete_tokens()