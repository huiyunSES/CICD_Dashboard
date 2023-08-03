from database_connection import *
from psycopg2 import sql
import csv
import os

class DatabaseSetup:
    
    def __init__(self):
        self.conn = make_connection()
        self.conn.autocommit = True
        self.cursor = self.conn.cursor()
     
        

    def create_tables(self):
        sql = """
        


        CREATE TABLE product_team (
            product_team_id VARCHAR(255) PRIMARY KEY,
            product_team VARCHAR(32)
        );
        
        CREATE TABLE role (
            role_id VARCHAR(255) PRIMARY KEY,
<<<<<<< HEAD
            role VARCHAR(255)
=======
            role_name VARCHAR(255)
>>>>>>> e46422e (Add codes to repo)
        );
        
        CREATE TABLE users (
            user_id VARCHAR(255) PRIMARY KEY,
            first_name VARCHAR(32),
            last_name VARCHAR(32),
            username VARCHAR(32),
            github_username VARCHAR(32),
            email VARCHAR(32),
            password VARCHAR(32),
            product_team_id VARCHAR REFERENCES product_team(product_team_id),
            role_id VARCHAR REFERENCES role(role_id)
        );
        
        CREATE TABLE repository (
            repo_id VARCHAR(255) PRIMARY KEY,
            repository_name VARCHAR(64),
            repository_description VARCHAR(255),
            is_disabled VARCHAR(32),
            default_branch VARCHAR(255),
            owner_id VARCHAR REFERENCES users(user_id),
            product_team_id VARCHAR REFERENCES product_team(product_team_id),
            created_at timestamp,
            updated_at timestamp
        );
        
        CREATE TABLE deployment (
            deployment_id VARCHAR(255) PRIMARY KEY,
            description VARCHAR(255),
            original_environment VARCHAR(32),
            environment VARCHAR(32),
            created_at timestamp,
            completed_at timestamp,
            is_production_environment VARCHAR(32),
            status VARCHAR(32),
            repo_id VARCHAR REFERENCES repository(repo_id),
            creator_id VARCHAR REFERENCES users(user_id)
        );
        
        CREATE TABLE issue (
            issue_id VARCHAR(255) PRIMARY KEY,
            issue_number INT,
            issue_name VARCHAR(255),
            issue_description VARCHAR(255),
            created_at timestamp,
            closed_at timestamp,
            due_on timestamp,
            repo_id VARCHAR REFERENCES repository(repo_id),
            assignee_id VARCHAR REFERENCES users(user_id)
        );
        
        CREATE TABLE pull_request (
            pull_request_id VARCHAR(255) PRIMARY KEY,
            description VARCHAR(255),
            state VARCHAR(32),
            created_at timestamp,
            merged_at timestamp,
            closed_at timestamp,
            creator_id VARCHAR REFERENCES users(user_id),
            repo_id VARCHAR REFERENCES repository(repo_id)
        );
        
        CREATE TABLE workflow_run (
            workflow_id VARCHAR(255) PRIMARY KEY,
            run_name VARCHAR(255),
            started_at timestamp,
            updated_at timestamp,
            main_branch VARCHAR(255),
            conclusion VARCHAR(32),
            run_number INT,
            event VARCHAR(255),
            converage_rate DECIMAL,
            repo_id VARCHAR REFERENCES repository(repo_id),
            actor_id VARCHAR REFERENCES users(user_id)
        );
        
        CREATE TABLE workflow_step (
            step_id VARCHAR(255) PRIMARY KEY,
            step_name VARCHAR(255),
            conclusion VARCHAR(32),
            workflow_id VARCHAR REFERENCES workflow_run(workflow_id),
            created_at timestamp,
            completed_at timestamp
        );
        
                
        """
        self.cursor.execute(sql)
        print("Tables created successfully!")
        

        


    def load_data_into_table(self):
        directory = '../data'
    
        file_list = ['product_team', 'role', 'users', 'repository', 'deployment',
                     'issue', 'pull_request', 'workflow_run', 'workflow_step']
      
        for filename in file_list:
            file_path = os.path.join(directory, f"{filename}.csv")
    
            with open(file_path, 'r') as f:
                next(f)
                self.cursor.copy_from(f, filename, sep=',')
    
        self.conn.commit()
        print("data loaded sucessfully!")

        
        
    def close_connection(self):
        self.cursor.close()
        self.conn.close()

def main():
    
    db_manager = DatabaseSetup()
    db_manager.create_tables()
    db_manager.load_data_into_table()
    db_manager.close_connection()

if __name__ == '__main__':
    main()

