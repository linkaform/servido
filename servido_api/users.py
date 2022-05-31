print('loading users ...')
from servido_api import srv
from flask import request,jsonify

from flask_jwt_extended import jwt_required, decode_token
# from linkaform_api import settings, utils, network

# from linkaform_api import settings, utils
# from .lkf_settings import config

@srv.route("/api/get_user", methods=["GET"])
@jwt_required()
def get_user():
    # Access the identity of the current user with get_jwt_identity
    jwt  = request.headers.get('Authorization').split(' ')[1]
    token_data = decode_token(jwt)
    user_data = jsonify(token_data).json
    user_data.update({'jwt':jwt})
    return user_data

def get_apikey(jwt, username):
    config = {
        'JWT_KEY':jwt,
    }
    settings.config.update(config)
    lkf_api = utils.Cache(settings)
    apikey = lkf_api.get_user_by_id(126, 'JWT_KEY').get('api_key')
    return apikey

def account_path(account_id):
    path = srv.config['dag_path'] + '/account/account_{}'.format(account_id)
    return path



    lkf_api = utils.Cache(settings)

    return 'TODO_getApiKey_apikey'
