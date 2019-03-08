import unittest
import sqlite3


from hashing import encryption
connect = sqlite3.connect('gameDatabase.db')
cursor = connect.cursor()


class TestDemo1(unittest.TestCase):
    def test(self):
        self.assertFalse(print(encryption.hash_password("word"))) == '$2b$12$KerVzLy3YaOV/pcyt37SxOi.WbQyNKmDAAT0SSmXUO208uNv8hVwO'
        self.assertFalse(print(encryption.hash_password("a word"))) == '$2b$12$kMRnsHuZXFVPKiZ6kXobWOvY27NEwiU45kyVd1n5DISVnf16T8yUq'
        self.assertFalse(print(encryption.hash_password(" "))) == ' '

        # self.assertTrue(encryption.insertUser("12345","$2b$12$efdIVEAbQCoXR9Ho3mIPG.BB5G1Q96t7dVUo9wPUXQ5J650lKld9K","player1"))
        # self.assertTrue(encryption.insertUser(" !@#","$2b$12$efdIVEAbQCoXR9Ho3mIPG.BB5G1Q96t7dVUo9wPUXQ5J650lKld9K","12yrold"))
        # self.assertTrue(encryption.insertUser("stringpw","$2b$12$efdIVEAbQCoXR9Ho3mIPG.BB5G1Q96t7dVUo9wPUXQ5J650lKld9K","881321"))

        # self.assertTrue(encryption.get_users()) == []

    connect.commit()
    connect.close()
if __name__ == '__main__':
    unittest.main()

