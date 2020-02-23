from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Crime

from flask_mongoengine import mongoengine

@app.route('/deleteCrimeByYear/<year>', methods=['DELETE'])
def deleteCrimeByYear(year=None):
    if request.method == 'DELETE':
        try:
            Crime.objects(year=year).delete()
            result = 200
            return ('Successfully deleted crime overview!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

            result = 500
            return ('Failed to delete crime overview!', result, error)


@app.route('/deleteCrimeByState/<state>', methods=['DELETE'])
def deleteCrimeByState(state=None):
    if request.method == 'DELETE':
        try:
            Crime.objects(state=state).delete()
            result = 200
            return ('Successfully deleted crime overview!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:
            result = 500
            return ('Failed to delete crime overview!', result, error)


@app.route('/deleteCrimeByStateAndYear', methods=['DELETE'])
def deleteCrimeByStateAndYear():
    state  = request.args.get('state', None)
    year  = int(request.args.get('year', None))

    if request.method == 'DELETE':
        try:
            Crime.objects(state=state, year=year).delete()
            result = 200
            return ('Successfully deleted crime overview!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

            result = 500
            return ('Failed to delete crime overview!', result, error)
