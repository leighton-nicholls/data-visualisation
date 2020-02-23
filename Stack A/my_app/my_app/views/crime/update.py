
from my_app import app
from my_app import helperFunctions as helper
from flask import jsonify, request, render_template
from my_app.mongodb import Crime
from flask_mongoengine import mongoengine

#create_crime_schema = Crime()

@app.route('/updateCrimeDocument', methods=['PUT'])
def updateCrimeDocument(): 
    if request.method == 'PUT':
        try:
                raw_year = request.args.get('year') if request.args.get('year') is not None else 0
                year =  int(raw_year) if helper.isInteger(raw_year) is True else 0
                state = request.args.get('state')

                raw_population = request.args.get('population') if request.args.get('population') is not None else 0
                raw_violent_crime_total = request.args.get('violent_crime_total') if request.args.get('violent_crime_total') is not None else 0
                raw_murder_and_nonnegligent_manslaughter_total = request.args.get('murder_and_nonnegligent_manslaughter_total') if request.args.get('murder_and_nonnegligent_manslaughter_total') is not None else 0
                raw_legacy_rape_total = request.args.get('legacy_rape_total') if request.args.get('legacy_rape_total') is not None else 0
                raw_revised_rape_total = request.args.get('revised_rape_total') if request.args.get('revised_rape_total') is not None else 0
                raw_robbery_total = request.args.get('robbery_total') if  request.args.get('robbery_total') is not None else 0
                raw_aggravated_assault_total = request.args.get('aggravated_assault_total') if request.args.get('aggravated_assault_total') is not None else 0
                raw_violent_crime_rate = request.args.get('violent_crime_rate') if request.args.get('violent_crime_rate') is not None else 0
                raw_murder_and_nonnegligent_manslaughter_rate = request.args.get('murder_and_nonnegligent_manslaughter_rate')  if request.args.get('murder_and_nonnegligent_manslaughter_rate')  is not None else 0
                raw_legacy_rape_rate = request.args.get('legacy_rape_rate') if request.args.get('legacy_rape_rate') is not None else 0
                raw_revised_rape_rate = request.args.get('revised_rape_rate') if request.args.get('revised_rape_rate') is not None else 0
                raw_robbery_rate = request.args.get('robbery_rate') if request.args.get('robbery_rate') is not None else 0
                raw_aggravated_assault_rate = request.args.get('aggravated_assault_rate') if request.args.get('aggravated_assault_rate') is not None else 0 
                
                population = int(raw_population) if helper.isInteger(raw_population) is True else 0
                violent_crime_total = int(raw_violent_crime_total) if helper.isInteger(raw_violent_crime_total) is True else 0
                murder_and_nonnegligent_manslaughter_total = int(raw_murder_and_nonnegligent_manslaughter_total) if helper.isInteger(raw_murder_and_nonnegligent_manslaughter_total) is True else 0
                legacy_rape_total = int(raw_legacy_rape_total) if helper.isInteger(raw_legacy_rape_total) is True else 0
                revised_rape_total = int(raw_revised_rape_total) if helper.isInteger(raw_revised_rape_total) is True else 0
                robbery_total = int(raw_robbery_total) if helper.isInteger(raw_robbery_total) is True else 0
                aggravated_assault_total = int(raw_aggravated_assault_total) if helper.isInteger(raw_aggravated_assault_total) is True else 0
                violent_crime_rate = float(raw_violent_crime_rate) if helper.isFloat(raw_violent_crime_rate) is True else 0
                murder_and_nonnegligent_manslaughter_rate = float(raw_murder_and_nonnegligent_manslaughter_rate) if helper.isFloat(raw_murder_and_nonnegligent_manslaughter_rate) is True else 0
                legacy_rape_rate = float(raw_legacy_rape_rate) if helper.isFloat(raw_legacy_rape_rate) is True else 0
                revised_rape_rate = float(raw_revised_rape_rate) if helper.isFloat(raw_revised_rape_rate) is True else 0
                robbery_rate = float(raw_robbery_rate) if helper.isFloat(raw_robbery_rate) is True else 0
                aggravated_assault_rate = float(raw_aggravated_assault_rate) if helper.isFloat(raw_aggravated_assault_rate) is True else 0

                Crime.objects.filter(year=year, state=state).update(
                        population = population,
                        violent_crime_total = violent_crime_total,
                        murder_and_nonnegligent_manslaughter_total = murder_and_nonnegligent_manslaughter_total,
                        legacy_rape_total = legacy_rape_total,
                        revised_rape_total = revised_rape_total,
                        robbery_total = robbery_total,
                        aggravated_assault_total = aggravated_assault_total,
                        violent_crime_rate = violent_crime_rate,
                        murder_and_nonnegligent_manslaughter_rate = murder_and_nonnegligent_manslaughter_rate,
                        legacy_rape_rate = legacy_rape_rate,
                        revised_rape_rate = revised_rape_rate,
                        robbery_rate = robbery_rate,
                        aggravated_assault_rate = aggravated_assault_rate
                )

                result = 200
                return ('Successfully updated crime document!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update crime document!', result, error)

@app.route('/updateCrimePopulation', methods=['PATCH'])
def updateCrimePopulation(): 
    if request.method == 'PATCH':
        try:
                raw_year = request.args.get('year') if request.args.get('year') is not None else 0
                year =  int(raw_year) if helper.isInteger(raw_year) is True else 0
                state = request.args.get('state')

                raw_population = request.args.get('population') if request.args.get('population') is not None else 0
                
                population = int(raw_population) if helper.isInteger(raw_population) is True else 0


                Crime.objects(year=year, state=state).update(
                        population = population
                )

                result = 200
                return ('Successfully updated crime!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update crime!', result, error)

@app.route('/updateViolentCrimeTotal', methods=['PATCH'])
def updateViolentCrimeTotal(): 
    if request.method == 'PATCH':
        try:
                raw_year = request.args.get('year') if request.args.get('year') is not None else 0
                year =  int(raw_year) if helper.isInteger(raw_year) is True else 0
                state = request.args.get('state')

                raw_violent_crime_total = request.args.get('violent_crime_total') if request.args.get('violent_crime_total') is not None and len(request.args.get('violent_crime_total')) > 0 else 0

                violent_crime_total = int(raw_violent_crime_total) if helper.isInteger(raw_violent_crime_total) is True else 0
                

                Crime.objects.filter(year=year, state=state).update(
                        violent_crime_total = violent_crime_total
                )

                result = 200
                return ('Successfully updated violent crime total!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update violent crime total!', result, error)


# abbreviated: full word is: murder and non nonnegligent manslaugther total
@app.route('/updateMurderNonNegManSlaugtherTotal', methods=['PATCH'])
def updateMurderNonNegManSlaugtherTotal(): 
    if request.method == 'PATCH':
        try:
                raw_year = request.args.get('year') if request.args.get('year') is not None else 0
                year =  int(raw_year) if helper.isInteger(raw_year) is True else 0
                state = request.args.get('state')

                raw_murder_and_nonnegligent_manslaughter_total = request.args.get('murder_and_nonnegligent_manslaughter_total') if request.args.get('murder_and_nonnegligent_manslaughter_total') is not None else 0

                murder_and_nonnegligent_manslaughter_total = int(raw_murder_and_nonnegligent_manslaughter_total) if helper.isInteger(raw_murder_and_nonnegligent_manslaughter_total) is True else 0
                

                Crime.objects.filter(year=year, state=state).update(
                        murder_and_nonnegligent_manslaughter_total = murder_and_nonnegligent_manslaughter_total,
                )

                result = 200
                return ('Successfully updated murder and nonnegligent manslaughter total!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update murder and nonnegligent manslaughter total!', result, error)

@app.route('/updateLegacyRapeTotal', methods=['PATCH'])
def updateLegacyRapeTotal(): 
    if request.method == 'PATCH':
        try:
                raw_year = request.args.get('year') if request.args.get('year') is not None else 0
                year =  int(raw_year) if helper.isInteger(raw_year) is True else 0
                state = request.args.get('state')

                raw_legacy_rape_total = request.args.get('legacy_rape_total') if request.args.get('legacy_rape_total') is not None else 0

                legacy_rape_total = int(raw_legacy_rape_total) if helper.isInteger(raw_legacy_rape_total) is True else 0
                

                Crime.objects.filter(year=year, state=state).update(
                        legacy_rape_total = legacy_rape_total,
                )

                result = 200
                return ('Successfully updated legacy rape total!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update legacy rape total!', result, error)

@app.route('/updateRevisedRapeTotal', methods=['PATCH'])
def updateRevisedRapeTotal(): 
    if request.method == 'PATCH':
        try:
                raw_year = request.args.get('year') if request.args.get('year') is not None else 0
                year =  int(raw_year) if helper.isInteger(raw_year) is True else 0
                state = request.args.get('state')

                raw_revised_rape_total = request.args.get('revised_rape_total') if request.args.get('revised_rape_total') is not None else 0

                revised_rape_total = int(raw_revised_rape_total) if helper.isInteger(raw_revised_rape_total) is True else 0
                

                Crime.objects.filter(year=year, state=state).update(
                        revised_rape_total = revised_rape_total,
                )

                result = 200
                return ('Successfully updated revised rape total!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update revised rape total!', result, error)

@app.route('/updateRobberyTotal', methods=['PATCH'])
def updateRobberyTotal(): 
    if request.method == 'PATCH':
        try:
                raw_year = request.args.get('year') if request.args.get('year') is not None else 0
                year =  int(raw_year) if helper.isInteger(raw_year) is True else 0
                state = request.args.get('state')

                raw_robbery_total = request.args.get('robbery_total') if  request.args.get('robbery_total') is not None else 0

                robbery_total = int(raw_robbery_total) if helper.isInteger(raw_robbery_total) is True else 0
                

                Crime.objects.filter(year=year, state=state).update(
                        robbery_total = robbery_total,
                )

                result = 200
                return ('Successfully updated robbery total!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update robbery total!', result, error)

@app.route('/updateAggravatedAssaultTotal', methods=['PATCH'])
def updateAggravatedAssaultTotal(): 
    if request.method == 'PATCH':
        try:
                raw_year = request.args.get('year') if request.args.get('year') is not None else 0
                year =  int(raw_year) if helper.isInteger(raw_year) is True else 0
                state = request.args.get('state')

                raw_aggravated_assault_total = request.args.get('aggravated_assault_total') if request.args.get('aggravated_assault_total') is not None else 0

                aggravated_assault_total = int(raw_aggravated_assault_total) if helper.isInteger(raw_aggravated_assault_total) is True else 0
                

                Crime.objects.filter(year=year, state=state).update(
                        aggravated_assault_total = aggravated_assault_total,
                )

                result = 200
                return ('Successfully updated aggravated assault total!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update robbery total!', result, error)


@app.route('/updateViolentCrimeRate', methods=['PATCH'])
def updateViolentCrimeRate(): 
    if request.method == 'PATCH':
        try:
                raw_year = request.args.get('year') if request.args.get('year') is not None else 0
                year =  int(raw_year) if helper.isInteger(raw_year) is True else 0
                state = request.args.get('state')

                raw_violent_crime_rate = request.args.get('violent_crime_rate') if request.args.get('violent_crime_rate') is not None else 0

                violent_crime_rate = float(raw_violent_crime_rate) if helper.isFloat(raw_violent_crime_rate) is True else 0
                

                Crime.objects.filter(year=year, state=state).update(
                        aggravated_assault_total = aggravated_assault_total,
                )

                result = 200
                return ('Successfully updated violent crime rate!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update violent crime rate!', result, error)

@app.route('/updateMurderNonNegManSlaugtherRate', methods=['PATCH'])
def updateMurderNonNegManSlaugtherRate(): 
    if request.method == 'PATCH':
        try:
                raw_year = request.args.get('year') if request.args.get('year') is not None else 0
                year =  int(raw_year) if helper.isInteger(raw_year) is True else 0
                state = request.args.get('state')

                raw_murder_and_nonnegligent_manslaughter_rate = request.args.get('murder_and_nonnegligent_manslaughter_rate')  if request.args.get('murder_and_nonnegligent_manslaughter_rate')  is not None else 0

                murder_and_nonnegligent_manslaughter_rate = float(raw_murder_and_nonnegligent_manslaughter_rate) if helper.isFloat(raw_murder_and_nonnegligent_manslaughter_rate) is True else 0
                

                Crime.objects.filter(year=year, state=state).update(
                        murder_and_nonnegligent_manslaughter_rate = murder_and_nonnegligent_manslaughter_rate,
                )

                result = 200
                return ('Successfully updated murder and nonnegligent manslaughter rate!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update murder and nonnegligent manslaughter rate!', result, error)

@app.route('/updateLegacyRapeRate', methods=['PATCH'])
def updateLegacyRapeRate(): 
    if request.method == 'PATCH':
        try:
                raw_year = request.args.get('year') if request.args.get('year') is not None else 0
                year =  int(raw_year) if helper.isInteger(raw_year) is True else 0
                state = request.args.get('state')

                raw_legacy_rape_rate = request.args.get('legacy_rape_rate') if request.args.get('legacy_rape_rate') is not None else 0

                legacy_rape_rate = float(raw_legacy_rape_rate) if helper.isFloat(raw_legacy_rape_rate) is True else 0
                

                Crime.objects.filter(year=year, state=state).update(
                        legacy_rape_rate = legacy_rape_rate,
                )

                result = 200
                return ('Successfully updated legacy rape rate!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update legacy rape rate!', result, error)

@app.route('/updateRevisedRapeRate', methods=['PATCH'])
def updateRevisedRapeRate(): 
    if request.method == 'PATCH':
        try:
                raw_year = request.args.get('year') if request.args.get('year') is not None else 0
                year =  int(raw_year) if helper.isInteger(raw_year) is True else 0
                state = request.args.get('state')

                raw_revised_rape_rate = request.args.get('revised_rape_rate') if request.args.get('revised_rape_rate') is not None else 0

                revised_rape_rate = float(raw_revised_rape_rate) if helper.isFloat(raw_revised_rape_rate) is True else 0
                

                Crime.objects.filter(year=year, state=state).update(
                        revised_rape_rate = revised_rape_rate,
                )

                result = 200
                return ('Successfully updated revised rape rate!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update revised rape rate!', result, error)

@app.route('/updateRobberyRate', methods=['PATCH'])
def updateRobberyRate(): 
    if request.method == 'PATCH':
        try:
                raw_year = request.args.get('year') if request.args.get('year') is not None else 0
                year =  int(raw_year) if helper.isInteger(raw_year) is True else 0
                state = request.args.get('state')

                raw_robbery_rate = request.args.get('robbery_rate') if request.args.get('robbery_rate') is not None else 0

                robbery_rate = float(raw_robbery_rate) if helper.isFloat(raw_robbery_rate) is True else 0
                

                Crime.objects.filter(year=year, state=state).update(
                        robbery_rate = robbery_rate,
                )

                result = 200
                return ('Successfully updated robbery rate!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update robbery rate!', result, error)

@app.route('/updateAggravatedAssaultRate', methods=['PATCH'])
def updateAggravatedAssaultRate(): 
    if request.method == 'PATCH':
        try:
                raw_year = request.args.get('year') if request.args.get('year') is not None else 0
                year =  int(raw_year) if helper.isInteger(raw_year) is True else 0
                state = request.args.get('state')

                raw_aggravated_assault_rate = request.args.get('aggravated_assault_rate') if request.args.get('aggravated_assault_rate') is not None else 0 

                aggravated_assault_rate = float(raw_aggravated_assault_rate) if helper.isFloat(raw_aggravated_assault_rate) is True else 0
                

                Crime.objects.filter(year=year, state=state).update(
                        aggravated_assault_rate = aggravated_assault_rate,
                )

                result = 200
                return ('Successfully updated aggravated assault rate!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update aggravated assault rate!', result, error)



