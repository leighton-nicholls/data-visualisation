from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Execution

from flask_mongoengine import mongoengine


@app.route('/insertNewExecution', methods=['POST'])
def insertNewExecution():
    if request.method == 'POST':

        print("Form: ", request.form)

        newExecution = ({
        'execution_number': request.form.get('execution_number'),
        'execution_date': request.form.get('execution_date'),
        'first_name': request.form.get('first_name'),
        'last_name': request.form.get('last_name'),
        'middle_name': request.form.get('middle_name'),
        'race': request.form.get('race'),
        'state': request.form.get('state'),
        'gender': request.form.get('gender'),
        'region': request.form.get('region'),
        'execution_method': request.form.get('execution_method'),
        
        })

        result = None

        # https://stackoverflow.com/questions/24868654/what-is-the-return-value-for-a-successful-mongodb-operation-with-mongoengine
        try:
            execution = Execution(**newExecution)
            save = execution.save(w=1)
            result = 201
            return "Successfully created new execution!", result

        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error: 
            result = 500
            return "Failed to insert new execution!", result, error