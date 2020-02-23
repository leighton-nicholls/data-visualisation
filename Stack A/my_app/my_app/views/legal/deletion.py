
from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Legal
from flask_mongoengine import mongoengine


# interesting use of immediate casting at https://stackoverflow.com/questions/42066913/how-to-use-delete-method-in-python-flask with <int:groupID>
@app.route('/deleteLegalStatusByState/<state>', methods=['DELETE'])
def deleteLegalStatusByState(state=None):
    print(request)
    if request.method == 'DELETE':
                try:
                    state = state
                    Legal.objects(state=state).delete()
                    result = 200
                    return ('Successfully deleted legal status document!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                        result = 500
                        return ('Failed to delete legal status document!', result, error)

@app.route('/deleteLegalStatusByStateAndDate', methods=['DELETE'])
def deleteLegalStatusByStateAndDate():
    if request.method == 'DELETE':
                try:
                        state  = request.args.get('state', None)
                        date  = int(request.args.get('date', None))

                        Legal.objects(state=state, date=date).delete()
                        result = 200
                        return ('Successfully deleted legal status document!', result)
                except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:
                        result = 500
                        return ('Failed to delete legal status document!', result, error)