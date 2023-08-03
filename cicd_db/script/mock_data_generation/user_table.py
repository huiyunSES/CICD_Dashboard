# create an empty dataframe and add columns
import pandas as pd
from faker import Faker
import random
import names
import string
from product_team_table import product_table_generator
from role_table import role_table_generator

df = pd.DataFrame()


def user_id_generator(cnt):
    
    user_ids = [i+1 for i in range(cnt)]
    df['user_id'] = user_ids
    
    return df

def name_generator(cnt):
    
    name = []
    for i in range(cnt):
        name.append(names.get_full_name())
    df['name'] = name
    df[["first_name", "last_name"]] = df["name"].str.split(expand=True)
    
    df.drop('name', axis=1, inplace=True)
    
    
    return df

def username_email_generator(cnt):
    
    
    df['username'] = df['first_name'].str[0].str.lower() + df['last_name'].str.lower() 
    df['github_username'] = df['first_name'].str[0].str.lower() + df['last_name'].str.lower()   
<<<<<<< HEAD
    df['email'] = df['github_username'] + "@company.com"
=======
    df['email'] = df['github_username'] + "@equinix.com"
>>>>>>> e46422e (Add codes to repo)
    
    return df

def password_generator(cnt):
    
    letters = string.ascii_letters + string.digits
    passwords = set()  # Use a set to store unique passwords

    while len(passwords) < cnt:
        password = ''.join(random.choice(letters) for i in range(8))
        passwords.add(password)

    df['password'] = list(passwords)
    return df



def random_distribute_value(lst, col_name, n):
    
    lst_ = []
    for i in range(n):
        lst_.append(random.choice(lst))
    df[col_name] = lst_
    
    return df 



product_team = pd.read_csv('../../data/product_team.csv')
role = pd.read_csv('../../data/role.csv')
product_id_list = list(product_team['product_team_id'])
role_id_list = list(role['role_id'])

def generate_mock_user_data(cnt):
    
    product_info = product_table_generator()
    role_info = role_table_generator()
    
    user_id_generator(cnt)
    name_generator(cnt)
    username_email_generator(cnt)
    password_generator(cnt)
    random_distribute_value(product_id_list, 'product_team_id', cnt)
    random_distribute_value(role_id_list, 'role_id', cnt)

   
cnt = 100
generate_mock_user_data(cnt)


filename = '../../data/users.csv'
df.to_csv(filename, index=False)