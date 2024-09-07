from flask import Blueprint, jsonify, request
from utils import db_utils

food_truck_blueprint = Blueprint('food_truck', __name__)

@food_truck_blueprint.route('/foodtrucks', methods=['GET'])
def get_food_trucks():
    
    db_client = db_utils()
    db_client.populate_db()
    food_trucks = db_client.db.foodtrucks.find({})

    output_list = list(food_trucks)

    for candidate in output_list:
        candidate['_id'] = str(candidate['_id'])
    
    return jsonify(output_list)
