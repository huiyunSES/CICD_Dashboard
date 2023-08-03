import pandas as pd
import random
from faker import Faker
from datetime import datetime

# Create an instance of the Faker class
fake = Faker()

# Load user and repository data
user_data = pd.read_csv('../../data/users.csv')
repository_data = pd.read_csv('../../data/repository.csv')

# Generate a random pull_request ID
def generate_pull_request_id():
    return f"pr-{str(i+1)}"

# Generate a random creator ID
def generate_creator_id():
    return random.choice(user_data['user_id'])

# Generate a random repository ID
def generate_repository_id():
    return random.choice(repository_data['repo_id'])

# Create a list to hold the pull_request records
pull_requests = []

# Generate pull_request records
for i in range(1000):  # Adjust the number of records as desired
    created_at = fake.date_time_between(
        start_date=datetime(2022, 6, 30),
        end_date=datetime(2023, 7, 20)
    )
    merged_at = fake.date_time_between(
        start_date=created_at,
        end_date=datetime(2023, 7, 20)
    )
    
   
    closed_at = fake.date_time_between(
            start_date=merged_at,
            end_date=datetime(2023, 7, 20)
        )
   

    pull_request_id = generate_pull_request_id()
    description = f"pull request_{str(i+1)}"
    state = random.choice(['open', 'closed'])
    created_at_str = created_at.strftime('%Y-%m-%dT%H:%M:%S')
    merged_at_str = merged_at.strftime('%Y-%m-%dT%H:%M:%S')
    
    # Convert 'closed_at' to string if it's not None
    closed_at_str = closed_at.strftime('%Y-%m-%dT%H:%M:%S') if closed_at else None

    creator_id = generate_creator_id()
    repository_id = generate_repository_id()

    pull_request = [pull_request_id, description, state, created_at_str, merged_at_str, closed_at_str, creator_id, repository_id]
    pull_requests.append(pull_request)

# Create a DataFrame from the pull_request records
fieldnames = ['pull_request_id', 'description', 'state', 'created_at', 'merged_at', 'closed_at', 'creator_id', 'repository_id']
df = pd.DataFrame(pull_requests, columns=fieldnames)

# Write the DataFrame to a CSV file
df.to_csv('../../data/pull_request.csv', index=False)

