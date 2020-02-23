from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Opinion

from flask_mongoengine import mongoengine


@app.route('/insertNewOpinion', methods=['POST'])
def insertNewOpinion():
    if request.method == 'POST':

        print("Form: ", request.form)

        newOpinion = ({
        'favour': request.form.get('favour'),
        'disfavour': request.form.get('disfavour'),
        'neutral': request.form.get('neutral'),
        'year': request.form.get('year')
     
        
        })

        result = None

        # https://stackoverflow.com/questions/24868654/what-is-the-return-value-for-a-successful-mongodb-operation-with-mongoengine
        try:
            opinion = Opinion(**newOpinion)
            save = opinion.save(w=1)
            result = 201
            return "Successfully created new opinion!", result

        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error: 
            result = 500
            return "Failed to insert new opinion!", result, error