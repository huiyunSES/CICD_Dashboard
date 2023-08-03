import unittest
from sqlalchemy_utils import database_exists
from sqlalchemy import create_engine
import sys

sys.path.append('../script')

from database_connection import *


class TestDatabase(unittest.TestCase):
    
    def setUp(self):
        self.config = read_db_configuration()
        self.conn = make_connection()
        self.cursor = self.conn.cursor() 
    
    def tearDown(self):
        
        self.cursor.close()
        self.conn.close()
    
    def test_config(self):
        
        # Check if any missing information in the config file
        self.assertNotIn("Missing fields in config section", self.config)
    
    def test_successful_database_connection(self):
        
        # Test if the database connection can be established
        self.assertIsNotNone(self.conn)
        
    def test_database_creation(self):
        
        # Test if the database can be created successfully
        database_name = 'cicd_dashboard'
        database_url = 'postgresql://{user}:{password}@localhost:{port}/{}'\
                        .format(database_name, **self.config)
                        
        engine = create_engine(database_url)
        
        self.assertTrue(database_exists(engine.url))
        
    def test_table_creation(self):
        
        # Test if tables are sucessfully created
        tables = ['users', 'product_team', 'repository', 'workflow_job', 'workflow_step',
                  'deployment', 'issue', 'pull_request']

        for table in tables:
            self.cursor.execute(f'''SELECT EXISTS 
                                (SELECT 1 FROM information_schema.tables 
                                  WHERE table_name = '{table}')''')
                                
            table_exists = self.cursor.fetchone()[0]
            self.assertTrue(table_exists, f"{table} does not exist.")
            
    def test_successful_data_loading(self):
        
        # Test if the tables contain data
        tables = ['user', 'product_team', 'repository', 'workflow_job', 
                      'deployment', 'issue', 'pull_request']

        for table in tables:
            self.cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = self.cursor.fetchone()[0]
            self.assertGreater(count, 0, f"{table} is empty. Data loading failed.")

        

if __name__ == "__main__":
    unittest.main()
