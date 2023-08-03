import unittest
import psycopg2
import os.path
import sys
import csv




class TestData(unittest.TestCase):
    def setUp(self):
<<<<<<< HEAD
        self.path = "./cicd_db/data"
=======
        self.path = "../data"
>>>>>>> e46422e (Add codes to repo)

    def test_mock_data_generation(self):
        for filename in os.listdir(self.path):
            if filename.endswith(".csv"):
                file_path = os.path.join(self.path, filename)
                with self.subTest(file_path=file_path):
                    self.assertTrue(os.path.exists(file_path))

    def test_data_csv_notEmpty(self):
        for filename in os.listdir(self.path):
            if filename.endswith(".csv"):
                file_path = os.path.join(self.path, filename)
                with self.subTest(file_path=file_path), open(file_path, 'r') as file:
                    data = file.read()
                    self.assertNotEqual(len(data), 0)

    def test_NoEmptyValue(self):
        for filename in os.listdir(self.path):
            if filename.endswith(".csv"):
                file_path = os.path.join(self.path, filename)
                with self.subTest(file_path=file_path), open(file_path, 'r') as file:
                    reader = csv.reader(file)
                    for row in reader:
                        stripped_row = [field.strip() for field in row]
                        self.assertNotIn('', stripped_row)


if __name__ == "__main__":
    unittest.main()

    

