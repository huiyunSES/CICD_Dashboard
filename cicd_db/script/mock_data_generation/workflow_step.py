import pandas as pd
import datetime
from faker import Faker


def random_timestamp(start_date, end_date):
    fake = Faker()
    timestamp = fake.date_time_between_dates(datetime_start=start_date, datetime_end=end_date)
    return timestamp.strftime('%Y-%m-%dT%H:%M:%S')

# File paths
input_csv_path = '../../data/workflow_step.csv'
output_csv_path = '../../data/workflow_step.csv'


df = pd.read_csv(input_csv_path)

# Generate random timestamps for the created_at column
start_date = datetime.datetime(2022, 6, 30)
end_date = datetime.datetime(2023, 7, 20)
df['created_at'] = [random_timestamp(start_date, end_date) for i in range(len(df))]


df['created_at'] = pd.to_datetime(df['created_at'])
df['completed_at'] = [random_timestamp(created_at, end_date) for created_at in df['created_at']]


df.to_csv(output_csv_path, index=False)

