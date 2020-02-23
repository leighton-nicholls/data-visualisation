
from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Crime
from flask_mongoengine import mongoengine


@app.route('/insertNewCrimeOverview', methods=['POST'])
def insertNewCrimeOverview():
    if request.method == 'POST':

        print("Form: ", request.form)

        newCrimeOverview = ({
        'year': request.form.get('year'),
        'state': request.form.get('state'),
        'population': request.form.get('population'),
        'violent_crime_total': request.form.get('violent_crime_total'),
        'murder_and_nonnegligent_manslaughter_total': request.form.get('murder_and_nonnegligent_manslaughter_total'),
        'legacy_rape_total': request.form.get('legacy_rape_total'),
        'revised_rape_total': request.form.get('revised_rape_total'),
        'robbery_total': request.form.get('robbery_total'),
        'aggravated_assault_total': request.form.get('aggravated_assault_total'),
        'violent_crime_rate': request.form.get('violent_crime_rate'),
        'murder_and_nonnegligent_manslaughter_rate': request.form.get('murder_and_nonnegligent_manslaughter_rate'),
        'legacy_rape_rate': request.form.get('legacy_rape_rate'),
        'revised_rape_rate': request.form.get('revised_rape_rate'),
        'robbery_rate': request.form.get('robbery_rate'),
        'aggravated_assault_rate': request.form.get('aggravated_assault_rate'),
     
        
        })

        result = None

        try:
            crime = Crime(**newCrimeOverview)
            save = crime.save(w=1)
            result = 201
            return "Successfully created new crime overview!", result

        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error: 
            result = 500
            return "Failed to insert new crime overview!", result, error