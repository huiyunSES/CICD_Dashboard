import random
from faker import Faker
<<<<<<< HEAD
from datetime import datetime
=======
from datetime import datetime, timedelta
>>>>>>> e46422e (Add codes to repo)
import pandas as pd

fake = Faker()

def generate_mock_data():
    user_table = pd.read_csv('../../data/users.csv')
    user_repository = pd.read_csv('../../data/repository.csv')

    user_ids = user_table['user_id'].tolist()
    repo_ids = user_repository['repo_id'].tolist()

    mock_data = []

    for i in range(300):  
        issue_id = f"issue-{str(i+1)}"
        issue_number = fake.random_int(min=1000, max=10000)
        issue_name = f"issue_{str(i+1)}"
        issue_description = f"fixing bug_{str(i+1).zfill(3)}"

        created_at = fake.date_time_between_dates(
            datetime_start=datetime(2022, 6, 30),
            datetime_end=datetime(2023, 7, 20)
        ).strftime('%Y-%m-%dT%H:%M:%S')

<<<<<<< HEAD


        # Randomly decide whether 'closed_at' should be set to a specific date or kept as null
        
        closed_at = fake.date_time_between_dates(
                datetime_start=datetime.strptime(created_at, '%Y-%m-%dT%H:%M:%S'),
                datetime_end=datetime(2023, 7, 20)
            ).strftime('%Y-%m-%dT%H:%M:%S')
        

        due_on = fake.date_time_between_dates(
            datetime_start=datetime.strptime(created_at, '%Y-%m-%dT%H:%M:%S'),
=======
        # Generate a closed_at timestamp within 3 days of created_at
        created_at_dt = datetime.strptime(created_at, '%Y-%m-%dT%H:%M:%S')
        closed_at = fake.date_time_between_dates(
            datetime_start=created_at_dt,
            datetime_end=created_at_dt + timedelta(days=2)
        ).strftime('%Y-%m-%dT%H:%M:%S')
        

        due_on = fake.date_time_between_dates(
            datetime_start=created_at_dt,
>>>>>>> e46422e (Add codes to repo)
            datetime_end=datetime(2023, 7, 20)
        ).strftime('%Y-%m-%dT%H:%M:%S')

        assigned_id = random.choice(user_ids)
        repo_id = random.choice(repo_ids)

        mock_data.append({
            'issue_id': issue_id,
            'issue_number': issue_number,
            'issue_name': issue_name,
            'issue_description': issue_description,
            'created_at': created_at,
            'closed_at': closed_at,
            'due_on': due_on,
            'repo_id': repo_id,
            'assignee_id': assigned_id
        })

    return pd.DataFrame(mock_data)

# Usage example
mock_data_df = generate_mock_data()
mock_data_df.to_csv('../../data/issue.csv', index=False)


<<<<<<< HEAD
=======

>>>>>>> e46422e (Add codes to repo)
