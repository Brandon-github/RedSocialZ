import database
import sys

class Followers(database.Database):
    #Funcion para añadir seguidores
    def add_follower(self, id_follorwer, id_following):
        """Esta funcion añade seguidores a la base de datos"""

        
        isset_follower = f"SELECT * FROM followers WHERE id_follower={id_follorwer} AND id_following={id_following}"

        self.cursor.execute(isset_follower)

        result = self.cursor.fetchone()

        try:
            if result[0]:
                return result
        except Exception as e:
            sql = f"INSERT INTO followers VALUES(null, {id_follorwer}, {id_following})"
            
            try:
                self.cursor.execute(sql)
                self.connection.commit()
                return True
            except:
                return False

                
    #Funcion para eliminar seguidores
    def delete_follower(self, id_follorwer, id_following):
        sql = f"DELETE FROM followers WHERE id_follower = {id_follorwer} AND id_following = {id_following}"
        self.cursor.execute(sql)
        self.connection.commit()

    #Ver seguidores de usuarios
    def view_followers(self, id_user):
        self.cursor.execute(f"SELECT COUNT(id_following) FROM followers WHERE id_following = {id_user}")
        value = self.cursor.fetchone()
        return value[0]

    #Ver a cuentos sigue un usuario
    def view_following(self, id_user):
        self.cursor.execute(f"SELECT COUNT(id_follower) FROM followers WHERE id_follower = {id_user}")
        value = self.cursor.fetchone()
        return value[0]

    #funcion para ver si ya existe un usuario seguido
    def isset_follower(self, follower, following):
        isset_follower = f"SELECT * FROM followers WHERE id_follower={follower} AND id_following={following}"

        self.cursor.execute(isset_follower)

        if(self.cursor.fetchone() == None):
            return 0
        else:
            return 1

database = Followers()

parameter = sys.argv[1]

if parameter == 'add_follower':
    id_follorwer = sys.argv[2]
    id_following = sys.argv[3]
    
    print(database.add_follower(id_follorwer, id_following))

elif parameter == 'view_followers':
    id_user = sys.argv[2]
    
    print(database.view_followers(id_user))

elif parameter == 'view_following':
    id_user = sys.argv[2]
    
    print(database.view_following(id_user))

elif parameter == 'isset_follower':
    id_follower = sys.argv[2]
    id_following = sys.argv[3]
    
    print(database.isset_follower(id_follower, id_following))

elif parameter == 'delete_follower':
    id_follower = sys.argv[2]
    id_following = sys.argv[3]
    
    print(database.delete_follower(id_follower, id_following))