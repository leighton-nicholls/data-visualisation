from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Legal

from flask_mongoengine import mongoengine


@app.route('/insertNewLegalStatusDocument', methods=['POST'])
def insertNewLegalStatusDocument():
    if request.method == 'POST':

        print("Form: ", request.form)

        newLegalStatus = ({
        'state': request.form.get('state').strip(),
        'date': request.form.get('date').strip(),
        'status': request.form.get('status').strip()
        })

        result = None

        try:
            legal = Legal(**newLegalStatus)
            save = legal.save(w=1)
            result = 201
            return "Successfully created new legal status!", result

        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error: 
            result = 500
            return "Failed to insert new legal status!", result, error