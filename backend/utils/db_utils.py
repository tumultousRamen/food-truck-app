import csv
from pymongo import MongoClient
from config import config

class DBUtils:
    def __init__(self):
        self.client = MongoClient(config.MONGO_URI)
        self.db = self.client.foodtrucks
        self.data_path = '/app/data/food-truck-data.csv' 
        self.data = []

    def insert_data(self):
        with open(self.data_path, newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                self.data.append(row)

    def populate_db(self):
        try:
            self.client.server_info()
        except:
            print('Error: Unable to connect to the database')

        collection = self.db.foodtrucks

        if collection.count_documents({}) == 0:
            self.insert_data()
            collection.insert_many(self.data)
            print('Data inserted successfully')
        else:
            print('Data already exists in the database')
