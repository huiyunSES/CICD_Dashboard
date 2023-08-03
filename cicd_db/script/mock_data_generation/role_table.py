import pandas as pd

def role_table_generator():
    
    roles = ['Executive', 'Developer', 'Project Lead']

    # Generate role IDs
    role_ids = [f"role-{str(i+1).zfill(6)}" for i in range(len(roles))]

  
    data = {
        'role_id': role_ids,
<<<<<<< HEAD
        'role': roles
=======
        'role_name': roles
>>>>>>> e46422e (Add codes to repo)
    }
    df = pd.DataFrame(data)
    
    # Save the DataFrame to a CSV file
    filename = '../../data/role.csv'
    df.to_csv(filename, index=False)
    
<<<<<<< HEAD
    role_data = dict(zip(data['role_id'], data['role']))
=======
    role_data = dict(zip(data['role_id'], data['role_name']))
>>>>>>> e46422e (Add codes to repo)
    
    return role_data
