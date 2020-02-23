from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Opinion
from flask_mongoengine import mongoengine


@app.route('/deleteOpinionByDate', methods=['DELETE'])
def deleteOpinionByDate():
    if request.method == 'DELETE':
                try:
                        Opinion.objects(year='2016-01-10').delete()
                        result = 200
                        return ('Successfully deleted opinion!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                        result = 500
                        return ('Failed to delete opinion!', result, error)

@app.route('/deleteOpinionByFavourSpecific', methods=['DELETE'])
def deleteOpinionByFavourSpecific():
    if request.method == 'DELETE':
        try:
                Opinion.objects(favour='56').delete()
                result = 200
                return ('Successfully deleted opinion!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to delete opinion!', result, error)

@app.route('/deleteOpinionByDisfavourSpecific', methods=['DELETE'])
def deleteOpinionByDisfavourSpecific():
    if request.method == 'DELETE':
        try:
                Opinion.objects(disfavour='33').delete()
                result = 200
                return ('Successfully deleted opinion!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to delete opinion!', result, error)

@app.route('/deleteOpinionByNeutralSpecific', methods=['DELETE'])
def deleteOpinionByNeutralSpecific():
    if request.method == 'DELETE':
        try:
                Opinion.objects(neutral='3').delete()
                result = 200
                return ('Successfully deleted opinion!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to delete opinion!', result, error)


@app.route('/deleteOpinionByFavourRange', methods=['DELETE'])
def deleteOpinionByFavourRange():
    if request.method == 'DELETE':
        try:
                Opinion.objects(favour='20').delete()
                result = 200
                return ('Successfully deleted opinion!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to delete opinion!', result, error)

@app.route('/deleteOpinionByDisfavourRange', methods=['DELETE'])
def deleteOpinionByDisfavourRange():
    if request.method == 'DELETE':
        try:
                Opinion.objects(disfavour='20').delete()
                result = 200
                return ('Successfully deleted opinion!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to delete opinion!', result, error)

@app.route('/deleteOpinionByNeutralRange', methods=['DELETE'])
def deleteOpinionByNeutralRange():
    if request.method == 'DELETE':
        try:
                Opinion.objects(neutral='5').delete()
                result = 200
                return ('Successfully deleted opinion!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to delete opinion!', result, error)

