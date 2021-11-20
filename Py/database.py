import pymysql

#clase de la base de datos
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