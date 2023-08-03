import pandas as pd
import datetime
from faker import Faker
import random


def random_timestamp(start_date, end_date):
    fake = Faker()
    timestamp = fake.date_time_between_dates(datetime_start=start_date, datetime_end=end_date)
    return timestamp.strftime('%Y-%m-%dT%H:%M:%S')

# File paths
input_csv_path = '../../data/repository.csv'
output_csv_path = '../../data/repository.csv'
user_csv_path = '../../data/users.csv'


df = pd.read_csv(input_csv_path)
user_df = pd.read_csv(user_csv_path)

# Generate random timestamps for the created_at column
start_date = datetime.datetime(2022, 6, 30)
end_date = datetime.datetime(2023, 7, 20)
df['created_at'] = [random_timestamp(start_date, end_date) for i in range(len(df))]


df['created_at'] = pd.to_datetime(df['created_at'])
df['updated_at'] = [random_timestamp(created_at, end_date) for created_at in df['created_at']]


owner_ids = user_df['user_id'].tolist()
df['owner_id'] = [random.choice(owner_ids) for i in range(len(df))]


df.to_csv(output_csv_path, index=False)




