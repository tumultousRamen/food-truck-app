from flask import Flask, jsonify, request
from flask_cors import CORS
from utils.db_utils import DBUtils
from app.routes import food_truck_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(food_truck_blueprint)

if __name__ == '__main__':
    host = '0.0.0.0'
    port = 5000

    db_client = DBUtils()
    db_client.populate_db()

    app.run(host=host, port=port, debug=True)


