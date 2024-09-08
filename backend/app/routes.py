from flask import Blueprint, jsonify, request
from utils.db_utils import DBUtils
from math import sin, cos, sqrt, atan2, radians

food_truck_blueprint = Blueprint('food_truck', __name__)

def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6373.0
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = R * c
    return distance

@food_truck_blueprint.route('/foodtrucks', methods=['GET'])
def get_food_trucks():
    db_client = DBUtils()
    db_client.populate_db()
    
    # Default values : Long and lat for Palo Alto
    user_lat = float(request.args.get('lat', 37.4419)) 
    user_lon = float(request.args.get('lon', -122.1430))
    radius = float(request.args.get('radius', 5)) 
    
    food_trucks = db_client.db.foodtrucks.find({})
    
    nearby_trucks = []
    for truck in food_trucks:
        truck_lat = float(truck['Latitude'])
        truck_lon = float(truck['Longitude'])
        distance = calculate_distance(user_lat, user_lon, truck_lat, truck_lon)
        
        if distance <= radius:
            truck['distance'] = distance
            truck['_id'] = str(truck['_id'])
            nearby_trucks.append(truck)
    
    # Sort by distance and limit to at least 5 trucks
    nearby_trucks.sort(key=lambda x: x['distance'])
    result = nearby_trucks[:max(5, len(nearby_trucks))]
    
    return jsonify(result)
