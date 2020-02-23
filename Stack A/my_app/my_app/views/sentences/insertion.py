from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Sentencing
from flask_mongoengine import mongoengine


@app.route('/insertNewSentence', methods=['POST'])
def insertNewSentence():
    if request.method == 'POST':

        print("Form: ", request.form)

        newSentence = ({
        'state': request.form.get('state'),
        'years': request.form.get('years')
        })

        result = None

        try:
            sentence = Sentence(**newSentence)
            save = sentence.save(w=1)
            result = 201
            return "Successfully created new sentence!", result

        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error: 
            result = 500
            return "Failed to insert new sentence!", result, error