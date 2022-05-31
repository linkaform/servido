print('loading __init__ ...')

from flask import Flask
from flask_cors import CORS

srv = Flask(__name__)
CORS(srv)




from servido_api import settings, views, users, auth
from servido_api import lkf_settings
#from app import views, dags, users
