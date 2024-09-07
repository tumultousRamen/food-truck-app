import os

class Config:
    # Set MongoDB URI
    MONGO_URI = os.environ.get('MONGO_URI')

config = Config()