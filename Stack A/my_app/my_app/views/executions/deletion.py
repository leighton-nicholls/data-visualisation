
from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Execution

from flask_mongoengine import mongoengine


@app.route('/deleteExecutionByNumber', methods=['DELETE'])
def deleteExecution():
    if request.method == 'DELETE':
                try:
                        Execution.objects(execution_number=1).delete()
                        result = 200
                        return ('Successfully deleted execution!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                        result = 500
                        return ('Failed to delete execution!', result, error)

@app.route('/deleteExecutionByDate', methods=['DELETE'])
def deleteExecutionByDate():
    if request.method == 'DELETE':
                try:
                        Execution.objects(execution_date='1997-05-25').delete()
                        result = 200
                        return ('Successfully deleted execution!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:
                        result = 500
                        return ('Failed to delete execution!', result, error)

@app.route('/deleteExecutionByMethod', methods=['DELETE'])
def deleteExecutionByMethod():
    if request.method == 'DELETE':
                try:
                        Execution.objects(execution_date=['Lethal Injection', 'Firing Squad']).delete()
                        result = 200
                        return ('Successfully deleted execution!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                        result = 500
                        return ('Failed to delete execution!', result, error)

@app.route('/deleteExecutionByState', methods=['DELETE'])
def deleteExecutionByState():
    if request.method == 'DELETE':
                try:
                        Execution.objects(state='Utah').delete()
                        result = 200
                        return ('Successfully deleted execution!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                        result = 500
                        return ('Failed to delete execution!', result, error)

@app.route('/deleteExecutionByName', methods=['DELETE'])
def deleteExecutionByName():
    if request.method == 'DELETE':
                try:
                        Execution.objects(first_name='Frank', last_name='Coppola', middle_name='').delete()
                        result = 200
                        return ('Successfully deleted execution!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                        result = 500
                        return ('Failed to delete execution!', result, error)

@app.route('/deleteExecutionByRegion', methods=['DELETE'])
def deleteExecutionByRegion():
    if request.method == 'DELETE':
                try:
                        Execution.objects(region='West').delete()
                        result = 200
                        return ('Successfully deleted execution!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                        result = 500
                        return ('Failed to delete execution!', result, error)

@app.route('/deleteExecutionByRace', methods=['DELETE'])
def deleteExecutionByRace():
    if request.method == 'DELETE':
                try:
                        Execution.objects(race='White').delete()
                        result = 200
                        return ('Successfully deleted execution!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                        result = 500
                        return ('Failed to delete execution!', result, error)

@app.route('/deleteExecutionByGender', methods=['DELETE'])
def deleteExecutionByGender():
    if request.method == 'DELETE':
                try:
                        Execution.objects(gender='Female').delete()
                        result = 200
                        return ('Successfully deleted execution!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                        result = 500
                        return ('Failed to delete execution!', result, error)