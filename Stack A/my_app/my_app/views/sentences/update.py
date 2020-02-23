
from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Sentencing
from flask_mongoengine import mongoengine

@app.route('/updateSentencingState', methods=['PATCH'])
def updateSentencingState(): 
    if request.method == 'PATCH':
        try:
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID = int(raw_id) if helper.isInteger(raw_id) is True else 0

                state = request.args.get('state') if request.args.get('state') is not None else ''
                
                Sentencing.objects.filter(_id=retrievedID).update(
                        state = state,
                )

                result = 200
                return ('Successfully updated sentencing state!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update sentencing state!', result, error)
