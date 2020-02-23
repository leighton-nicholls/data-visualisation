
from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Legal

from flask_mongoengine import mongoengine


@app.route('/updateLegalStatusDocument', methods=['PUT'])
def updateLegalStatusDocument(): 
    if request.method == 'PUT':
        try: 
                raw_id = request.args.get('id').strip() if request.args.get('id').strip() is not None else 0
                retrievedID =  int(raw_id).strip() if helper.isInteger(raw_id).strip() is True else 0

                state = request.args.get('state') if request.args.get('state') is not None else ''
                date = request.args.get('date') if request.args.get('date') is not None else '00/00/1970'
                status = request.args.get('status') if request.args.get('status') is not None else ''

                Legal.objects.filter(_id=retrievedID).update(
                        state=state,
                        date = date,
                        status = status
                )

                result = 200
                return ('Successfully updated legal status document!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:
                result = 500
                return ('Failed to update legal status document!', result, error)

@app.route('/updateLegalStatusDateByID', methods=['PATCH'])
def updateLegalStatusDateByID(): 
    if request.method == 'PATCH':
        try:
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID =  int(raw_id) if helper.isInteger(raw_id) is True else 0

                date = request.args.get('date') if request.args.get('date') is not None else ''
                
                Legal.objects.filter(_id=retrievedID).update(
                        date = date,
                )

                result = 200
                return ('Successfully updated legal status date by id!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update legal status date by id!', result, error)

@app.route('/updateLegalStatusDateByStateAndDate', methods=['PATCH'])
def updateLegalStatusDateByStateAndDate(): 
    if request.method == 'PATCH':
        try:
                state = request.args.get('state') if request.args.get('state') is not None else ''
                current_date = request.args.get('current_date') if request.args.get('current_date') is not None else ''
                new_date = request.args.get('new_date') if request.args.get('new_date') is not None else ''
                
                Legal.objects.filter(state=state, date=current_date).update(
                        date = new_date
                )

                result = 200
                return ('Successfully updated legal status date by state and date!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update legal status date by state and date!', result, error)


@app.route('/updateLegalStatusByID', methods=['PATCH'])
def updateLegalStatus(): 
    if request.method == 'PATCH':
        try:
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID =  int(raw_id) if helper.isInteger(raw_id) is True else 0

                status = request.args.get('status') if request.args.get('status') is not None else ''
                
                Legal.objects.filter(_id=retrievedID).update(
                        status = status,
                )

                result = 200
                return ('Successfully updated legal status by id!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update legal status by id!', result, error)

@app.route('/updateLegalStatusByStateAndDate', methods=['PATCH'])
def updateLegalStatusByStateAndDate(): 
    if request.method == 'PATCH':
        try:
                state = request.args.get('state') if request.args.get('state') is not None else ''
                date = request.args.get('date') if request.args.get('date') is not None else ''

                status = request.args.get('status') if request.args.get('status') is not None else ''
                
                Legal.objects.filter(state=state, date=date).update(
                        status = status,
                )

                result = 200
                return ('Successfully updated legal status by state and date!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update legal status by state and date!', result, error)


