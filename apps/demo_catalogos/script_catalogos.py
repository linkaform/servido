#-*- coding: utf-8 -*-
import simplejson, sys
from linkaform_api import settings, network, utils
from bson import ObjectId
import time, pytz, math
from datetime import datetime, timedelta, date
from account_settings import *
from unicodedata import normalize

#-----QUERY 
def get_catalog(catalogo_id, parameter = None):
    match_query = { 
        'deleted_at':{"$exists":False},
    }

    if parameter != None:
        match_query.update(parameter)
    
    mango_query = {"selector":
        {"answers":
            {"$and":[match_query]}
        },
        "limit":10000,
        "skip":0
    }
    #Catalog_id: 86531
    res = lkf_api.search_catalog(catalogo_id, mango_query,  jwt_settings_key='USER_JWT_KEY')
    return res

if __name__ == "__main__":
    #----Log
    print(sys.argv)
    #----Filter
    all_data = simplejson.loads(sys.argv[2])
    data = all_data.get("data", {})
    option = data.get("option")
    parameter = data.get("parameter")
    #----Config
    lkf_api = utils.Cache(settings)
    jwt_parent = lkf_api.get_jwt(api_key=config["APIKEY"])
    config["USER_JWT_KEY"] = jwt_parent
    settings.config.update(config)
    lkf_api = utils.Cache(settings)
    net = network.Network(settings)
    cr = net.get_collections()
    #-----Execution query catalogs
    response = {}
    #option = 7;
    if option == 1:
        response = get_catalog(85709);
    elif option == 2:
        response = get_catalog(85537);
    elif option == 3:
        response = get_catalog(85541);
    elif option == 4:
        response = get_catalog(85540);
    elif option == 5:
        response = get_catalog(85538);
    elif option == 6:
        #parameter = [33020]
        dic_query = {}
        if parameter != None:
            dic_query = {'62b910e04f1531bc1e5101a2':{'$eq':str(parameter[0])}}
        response = get_catalog(85538,dic_query);
    elif option == 7:
        print('Entrra a 7')
        #parameter = [33020,'Zona 1']
        dic_query = {}
        if parameter != None:
            dic_query = {
                '62b910e04f1531bc1e5101a2':{'$eq':str(parameter[0]) }, 
                '6336fcc6d313f7486961127f':{'$eq':str(parameter[1]) }, 
            }
        response = get_catalog(85538,dic_query)
        print('response',response)
    elif option == 8:
        dic_query = {
            '6387d440cf2f03fa7a9c1391':{'$eq':'disponible'}, 
        }
        response = get_catalog(93506,dic_query)
    elif option == 9:
        dic_query = {}
        if parameter != None:
            dic_query = {
                '6387d440cf2f03fa7a9c1391':{'$eq':'disponible'}, 
                '6387d440cf2f03fa7a9c1391':{'$eq':str(parameter[0])},
            }
        response = get_catalog(93506,dic_query)

    sys.stdout.write(simplejson.dumps(
        {
            "catalog":response,
        })
    )
 