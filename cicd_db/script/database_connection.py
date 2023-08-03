from configparser import ConfigParser
import psycopg2
import sys


def read_db_configuration(filename='../config/config.ini', section='Postgresql'):
    
    parser = ConfigParser()
    parser.read(filename)
    
    required_fields = ['host', 'user', 'password', 'port']
    config = {}

    if parser.has_section(section):
        items = parser.items(section)

        for item in items:
            config[item[0]] = item[1]

        missing_fields = [field for field in required_fields if field not in config]
        
        if missing_fields:
            print(f'Missing fields in config file: {", ".join(missing_fields)}')
            return
    else:
        print(f'Missing fields in config file: header missing or header is not Postgresql')

    return config



def make_connection():
    
    try:
        db_config = read_db_configuration()
        conn = psycopg2.connect(**db_config)

        if conn.status == psycopg2.extensions.STATUS_READY:
            return conn

    except TypeError:
        print('Connection failed.')
   
        

    return None







