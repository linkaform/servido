print('loading cookie ...')
from servido_api import srv
# from flask import request,jsonify
from flask import Flask, make_response, request, jsonify
from flask_jwt_extended import decode_token

@srv.route('/api/setauth')
def setcookie():
    print('srv domain', srv)
    domain='srv.linkaform.com'
    user_id = None
    jwt_token  = request.headers.get('Authorization', " ").split(' ')[1]
    print('jwt1', jwt_token)
    if jwt_token:
        token_data = decode_token(jwt_token)
        user_data = jsonify(token_data).json
        print('user_data', user_data)

        user_id = str(user_data.get('user_id', ''))
        #optional
        parent_id = str(user_data.get('parent_id', ''))
        email = user_data.get('email', '')
        username = user_data.get('username', '')
    if jwt_token and user_id:
        resp = make_response(f"Your Cookies needed to run Servido hosted at {domain} has been set")
        resp.set_cookie('userJwt',jwt_token,  domain=domain, path='/', samesite='None', secure=True )
        resp.set_cookie('userId',user_id,     domain=domain, path='/', samesite='None', secure=True )
        resp.set_cookie('userName',username,  domain=domain, path='/', samesite='None', secure=True )
        resp.set_cookie('email',email,        domain=domain, path='/', samesite='None', secure=True )
        resp.set_cookie('userParentId',parent_id, domain=domain, path='/', samesite='None', secure=True )
    elif not jwt_token:
        resp = make_response("You must send an Authorization Header to setup a cookie")
    elif jwt_token and not user_id:
        resp = make_response("user_id needes as key on the JWT token")
    elif user_id and not jwt_token:
        resp = make_response("Double check you JWT")
    elif not jwt_token and not user_id:
        resp = make_response("You must send an Authorization Header to setup a cookie")
    else:
        resp = make_response("What the, this response was not planed!!!" )
    return resp


@srv.route('/api/getcookie')
def getcookie():
    resp = ""
    for key, value in request.cookies.items():
        resp += "Key: {} , Valuse: {} \n".format(key, value)
    print('res', resp)
    return make_response(resp)
