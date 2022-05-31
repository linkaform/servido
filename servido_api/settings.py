print('loading settings ...')
from servido_api import srv

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import flask_jwt_extended
from flask import request
from flask import jsonify
from flask_pymongo import PyMongo



from datetime import datetime, timedelta




pubKeyFile = open('/srv/servido/servido_api/certs/jwt.pub', 'r')
srv.config["JWT_PUBLIC_KEY"] = pubKeyFile.read()
privKeyFile = open('/srv/servido/servido_api/certs/jwt','r')
srv.config["JWT_PRIVATE_KEY"] = privKeyFile.read()
srv.config["JWT_ALGORITHM"] = 'RS256'
srv.config["JWT_HEADER_NAME"] = 'Authorization'
srv.config["JWT_HEADER_TYPE"] = 'Bearer'
srv.config["JWT_SECRET_KEY"] = ')*za+_u1h(_nvh@vj@_z*n9*ejm-^8$cq+da^m^97-$2g^r4kb'
#srv.config["JWT_TOKEN_LOCATION"] = ["headers"]
srv.config["JWT_VERIFY_EXPIRATION"] = True
srv.config["JWT_VERIFY"] = True
srv.config["JWT_LEEWAY"] = 10
srv.config["JWT_EXPIRATION_DELTA"] = timedelta(seconds=7*86400)
srv.config["JWT_EXPIRATION_DELTA_MOBILE"] = timedelta(seconds=365*86400)
srv.config["JWT_AUTH_HEADER_PREFIX"] = ('JWT', 'Bearer')
srv.config["JWT_ALLOW_REFRESH"] = False
srv.config['JWT_IDENTITY_CLAIM'] = 'username'

jwt =JWTManager(srv)



srv.config['MONGO_DBNAME'] = 'poop'
srv.config['MONGO_URI'] = 'mongodb://mongodb:27017/poop'
mongo = PyMongo(srv)


srv.config['dag_path'] = '/opt/airflow/dags/srv_dags'



@srv.route("/api/login", methods=["POST"])
def login():
    print('request jsoan', request.json)
    if request.json:
        username = request.json.get("username", None)
        password = request.json.get("password", None)
    # if username != "test" or password != "test":
    #     return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)


@srv.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    jwt  = request.headers.get('Authorization').split(' ')[1]
    token_data = flask_jwt_extended.decode_token(jwt)
    current_user = get_jwt_identity()
    print('uccentuser', current_user)
    return jsonify(current_user), 200
