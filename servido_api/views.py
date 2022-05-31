print('loading views ...')

from servido_api import srv
from flask_jwt_extended import jwt_required
from flask import render_template
from flask import Flask, jsonify


print('aqui esta l aruta')
@srv.route('/api', methods=['GET'])
def homeA():
    a = jsonify({
        'name': 'Servido up and Running',
        'email': 'backend@linkaform.com',
        'git': 'http://gitlab.linkaform.com/servido',
        })
    return a


@srv.route('/api/template')
def template():
    return render_template('home.html')
