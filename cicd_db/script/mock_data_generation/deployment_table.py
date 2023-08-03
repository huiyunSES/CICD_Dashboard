import pandas as pd
import random
import datetime
from faker import Faker

# Define the list of original environments and environments
original_environments = ['build', 'prod', 'UAT', 'QA', 'others']
environments = ['build', 'prod', 'UAT', 'QA', 'others']
fake = Faker()

def generate_deployment_id():
    return f"deploy-{str(i+1)}"

def generate_repository_id():
    repository_data = pd.read_csv('../../data/repository.csv')
    return random.choice(repository_data['repo_id'])

def generate_creator_id():
    user_data = pd.read_csv('../../data/users.csv')
    return random.choice(user_data['user_id'])

deployments = []

# Generate deployment records
for i in range(1000):  
    
    original_environment = random.choice(original_environments)
    if original_environment == 'prod':
        environment = 'prod'
    else:
        environment = random.choice(environments)
    
    is_production_environment = str(environment == 'prod')
    
    created_at = fake.date_time_between(
        start_date=datetime.datetime(2022, 6, 30),
        end_date=datetime.datetime(2023, 7, 20)
    ).strftime('%Y-%m-%dT%H:%M:%S')
    
<<<<<<< HEAD
    completed_at = fake.date_time_between(
        start_date=datetime.datetime.strptime(created_at, '%Y-%m-%dT%H:%M:%S'),
        end_date=datetime.datetime(2023, 7, 20)
    ).strftime('%Y-%m-%dT%H:%M:%S')
=======
    completed_at =min(created_at + datetime.timedelta(days=3), datetime.datetime(2023,7,20))
    
    # completed_at = fake.date_time_between(
    #     start_date=datetime.datetime.strptime(created_at, '%Y-%m-%dT%H:%M:%S'),
    #     end_date=datetime.datetime(2023, 7, 20)
    # ).strftime('%Y-%m-%dT%H:%M:%S')
>>>>>>> e46422e (Add codes to repo)
    
    created_date = datetime.datetime.strptime(created_at, '%Y-%m-%dT%H:%M:%S').date()
    description = f"deployed from the {original_environment} to {environment} {created_date}"
    status = random.choice(['success', 'failed'])
    repository_id = generate_repository_id()
    creator_id = generate_creator_id()

    deployment_id = generate_deployment_id()
    deployment = [deployment_id, description, original_environment, environment, created_at, completed_at,
                  is_production_environment, status, repository_id, creator_id]
    
    deployments.append(deployment)

# Create a DataFrame from the deployment records
fieldnames = ['deployment_id', 'description', 'original_environment', 'environment', 'created_at', 'completed_at',
              'is_production_environment', 'status', 'repo_id', 'creator_id']

df = pd.DataFrame(deployments, columns=fieldnames)

df.to_csv('../../data/deployment.csv', index=False)
