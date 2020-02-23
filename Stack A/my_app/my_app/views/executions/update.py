from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Execution

from flask_mongoengine import mongoengine


@app.route('/updateExecutionDocument', methods=['PUT'])
def updateExecutionDocument(): 
    if request.method == 'PUT':
        try: 
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID =  int(raw_id) if helper.isInteger(raw_id) is True else 0

                raw_execution_number = request.args.get('execution_number') if request.args.get('execution_number') is not None else 0
                raw_execution_date = request.args.get('execution_date') if request.args.get('execution_date') is not None else 0
                raw_first_name = request.args.get('first_name') if request.args.get('first_name') is not None else 0
                raw_last_name = request.args.get('last_name') if request.args.get('last_name') is not None else 0
                raw_middle_name = request.args.get('middle_name') if request.args.get('middle_name') is not None else 0
                raw_race = request.args.get('race') if  request.args.get('race') is not None else 0
                raw_state = request.args.get('state') if request.args.get('state') is not None else 0
                raw_gender = request.args.get('gender') if request.args.get('gender') is not None else 0
                raw_region = request.args.get('region')  if request.args.get('region')  is not None else 0
                raw_execution_method = request.args.get('execution_method') if request.args.get('execution_method') is not None else 0
                
                execution_number = int(raw_execution_number) if helper.isInteger(raw_execution_number) is True else 0
                execution_date = int(raw_execution_date) if helper.isInteger(raw_execution_date) is True else 0
                first_name = int(raw_first_name) if helper.isInteger(raw_first_name) is True else 0
                last_name = int(raw_last_name) if helper.isInteger(raw_last_name) is True else 0
                middle_name = int(raw_middle_name) if helper.isInteger(raw_middle_name) is True else 0
                race = int(raw_race) if helper.isInteger(raw_race) is True else 0
                state = int(raw_state) if helper.isInteger(raw_state) is True else 0
                gender = float(raw_gender) if helper.isFloat(raw_gender) is True else 0
                region = float(raw_region) if helper.isFloat(raw_region) is True else 0
                execution_method = float(raw_execution_method) if helper.isFloat(raw_execution_method) is True else 0

                Execution.objects.filter(_id=retrievedID).update(
                        execution_number = execution_number,
                        execution_date = execution_date,
                        first_name = first_name,
                        last_name = last_name,
                        middle_name = middle_name,
                        race = race,
                        state = state,
                        gender = gender,
                        region = region,
                        execution_method = execution_method
                )

                result = 200
                return ('Successfully updated execution document!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:
                result = 500
                return ('Failed to update execution document!', result, error)


@app.route('/updateExecutionDate', methods=['PATCH'])
def updateExecutionDate(): 
    if request.method == 'PATCH':
        try:
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID =  int(raw_id) if helper.isInteger(raw_id) is True else 0

                raw_execution_date = request.args.get('execution_date') if request.args.get('execution_date') is not None else 0 

                execution_date = int(raw_execution_date) if helper.isInteger(raw_execution_date) is True else 0
                
                Execution.objects.filter(_id=retrievedID).update(
                        execution_date = execution_date,
                )

                result = 200
                return ('Successfully updated execution date!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update execution date!', result, error)


@app.route('/updateExecutionFirstName', methods=['PATCH'])
def updateExecutionFirstName(): 
    if request.method == 'PATCH':
        try:
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID =  int(raw_id) if helper.isInteger(raw_id) is True else 0

                raw_first_name = request.args.get('first_name') if request.args.get('first_name') is not None else 0

                first_name = int(raw_first_name) if helper.isInteger(raw_first_name) is True else 0
                
                Execution.objects.filter(_id=retrievedID).update(
                        first_name = first_name,
                )

                result = 200
                return ('Successfully updated first name!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update first name!', result, error)

@app.route('/updateExecutionLastName', methods=['PATCH'])
def updateExecutionLastName(): 
    if request.method == 'PATCH':
        try:
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID =  int(raw_id) if helper.isInteger(raw_id) is True else 0

                raw_last_name = request.args.get('last_name') if request.args.get('last_name') is not None else 0

                last_name = int(raw_last_name) if helper.isInteger(raw_last_name) is True else 0
                
                Execution.objects.filter(_id=retrievedID).update(
                        last_name = last_name,
                )

                result = 200
                return ('Successfully updated last name!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update last name!', result, error)

@app.route('/updateExecutionMiddleName', methods=['PATCH'])
def updateExecutionMiddleName(): 
    if request.method == 'PATCH':
        try:
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID =  int(raw_id) if helper.isInteger(raw_id) is True else 0

                raw_middle_name = request.args.get('middle_name') if request.args.get('middle_name') is not None else 0

                middle_name = int(raw_middle_name) if helper.isInteger(raw_middle_name) is True else 0
                
                Execution.objects.filter(_id=retrievedID).update(
                        middle_name = middle_name,
                )

                result = 200
                return ('Successfully updated middle name!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update middle name!', result, error)

@app.route('/updateExecutionRace', methods=['PATCH'])
def updateExecutionRace(): 
    if request.method == 'PATCH':
        try:
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID =  int(raw_id) if helper.isInteger(raw_id) is True else 0

                raw_race = request.args.get('race') if  request.args.get('race') is not None else 0

                race = int(raw_race) if helper.isInteger(raw_race) is True else 0
                
                Execution.objects.filter(_id=retrievedID).update(
                        race = race,
                )

                result = 200
                return ('Successfully updated race!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update race!', result, error)

@app.route('/updateExecutionState', methods=['PATCH'])
def updateExecutionState(): 
    if request.method == 'PATCH':
        try:
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID =  int(raw_id) if helper.isInteger(raw_id) is True else 0

                raw_state = request.args.get('state') if request.args.get('state') is not None else 0

                state = int(raw_state) if helper.isInteger(raw_state) is True else 0
                
                Execution.objects.filter(_id=retrievedID).update(
                        state = state,
                )

                result = 200
                return ('Successfully updated state!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update state!', result, error)

@app.route('/updateExecutionGender', methods=['PATCH'])
def updateExecutionGender(): 
    if request.method == 'PATCH':
        try:
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID =  int(raw_id) if helper.isInteger(raw_id) is True else 0

                raw_gender = request.args.get('gender') if request.args.get('gender') is not None else 0

                gender = float(raw_violent_crime_rate) if helper.isFloat(raw_violent_crime_rate) is True else 0
                
                Execution.objects.filter(_id=retrievedID).update(
                        gender = gender,
                )

                result = 200
                return ('Successfully updated gender!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update gender!', result, error)

@app.route('/updateExecutionRegion', methods=['PATCH'])
def updateExecutionRegion(): 
    if request.method == 'PATCH':
        try:
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID =  int(raw_id) if helper.isInteger(raw_id) is True else 0

                raw_region = request.args.get('region')  if request.args.get('region')  is not None else 0              

                region = float(raw_gender) if helper.isFloat(raw_gender) is True else 0
                
                Execution.objects.filter(_id=retrievedID).update(
                        region = region,
                )

                result = 200
                return ('Successfully updated region!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update region!', result, error)

@app.route('/updateExecutionMethod', methods=['PATCH'])
def updateExecutionMethod(): 
    if request.method == 'PATCH':
        try:
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID =  int(raw_id) if helper.isInteger(raw_id) is True else 0

                raw_execution_method = request.args.get('execution_method') if request.args.get('execution_method') is not None else 0        

                execution_method = float(raw_execution_method) if helper.isFloat(raw_execution_method) is True else 0
                
                Execution.objects.filter(_id=retrievedID).update(
                        execution_method = execution_method,
                )

                result = 200
                return ('Successfully updated execution_method!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update execution_method!', result, error)