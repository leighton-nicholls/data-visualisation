from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Sentencing
from flask_mongoengine import mongoengine



@app.route('/deleteSentenceByState', methods=['DELETE'])
def deleteSentenceByState():
    if request.method == 'DELETE':
                try:
                        Execution.objects(state='Military').delete()
                        result = 200
                        return ('Successfully deleted sentence!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                        result = 500
                        return ('Failed to delete sentence!', result, error)

@app.route('/deleteSentenceByYear', methods=['DELETE'])
def deleteSentenceByYear():
    if request.method == 'DELETE':
                try:
                        Execution.objects(years='Military').delete()
                        result = 200
                        return ('Successfully deleted sentence!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                        result = 500
                        return ('Failed to delete sentence!', result, error)

@app.route('/deleteSentenceByStateAndYear', methods=['DELETE'])
def deleteSentenceByStateAndYear():
    if request.method == 'DELETE':
                try:
                        Execution.objects(state='Military').delete()
                        result = 200
                        return ('Successfully deleted sentence!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                        result = 500
                        return ('Failed to delete sentence!', result, error)

@app.route('/deleteSentenceBySentencingNumber', methods=['DELETE'])
def deleteSentenceBySentencingNumber():
    if request.method == 'DELETE':
                try:
                        Execution.objects(years=10).delete()
                        result = 200
                        return ('Successfully deleted sentence!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                        result = 500
                        return ('Failed to delete sentence!', result, error)