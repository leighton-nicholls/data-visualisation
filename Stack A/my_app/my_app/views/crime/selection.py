
from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Crime

from flask_mongoengine import mongoengine

@app.route('/getAllCrimeDocuments', methods=['GET'])
def getAllCrimeDocuments():
    pipeline = [
    {
        "$project":
        {
            "_id": 0
        
        }
    }
    ]

    crime_rates = Crime.objects.aggregate(*pipeline)
    print(crime_rates)

    result = []
    for document in crime_rates:
        result.append(document)
    print(result)
    return jsonify(result)

@app.route('/getAllCrimeByYear/<year>', methods=['GET'])
def getAllCrimeByYear(year=None):
    pipeline = [
    {
        "$project":
        {
            "_id": 0,
            "state": 1,
            "year": 1,
            "population": 1,
            "violent_crime_total": 1,
            "murder_and_nonnegligent_manslaughter_total": 1,
            "legacy_rape_total": 1,
            "revised_rape_total": 1,
            "robbery_total": 1,
            "aggravated_assault_total": 1,
            "violent_crime_rate": 1,
            "murder_and_nonnegligent_manslaughter_rate": 1,
            "legacy_rape_rate": 1,
            "revised_rape_rate": 1,
            "robbery_rate": 1,
            "aggravated_assault_rate": 1
        
        }
    },
      { "$match" : { "year": int(year) } } 

    ]

    crime_rates = Crime.objects.aggregate(*pipeline)
    print(crime_rates)

    result = []
    for document in crime_rates:
        result.append(document)
    print(result)
    return jsonify(result)

@app.route('/getAllCrimeByState/<state>', methods=['GET'])
def getAllCrimeByState(state=None):
    pipeline = [
    {
        "$project":
        {
            "_id": 0,

            "year": 1,
            "population": 1,
            "violent_crime_total": 1,
            "murder_and_nonnegligent_manslaughter_total": 1,
            "legacy_rape_total": 1,
            "revised_rape_total": 1,
            "robbery_total": 1,
            "aggravated_assault_total": 1,
            "violent_crime_rate": 1,
            "murder_and_nonnegligent_manslaughter_rate": 1,
            "legacy_rape_rate": 1,
            "revised_rape_rate": 1,
            "robbery_rate": 1,
            "aggravated_assault_rate": 1,
        
        }
    },
     { "$match" : { "state": state } }
    ]

    crime_rates = Crime.objects.aggregate(*pipeline)
    print(crime_rates)

    result = []
    for document in crime_rates:
        result.append(document)
    print(result)
    return jsonify(result)

@app.route('/getAllCrimeByStateByYear', methods=['GET'])
def getAllCrimeByStateByYear():
    state  = request.args.get('state', None)
    year  = int(request.args.get('year', None))

    pipeline = [
    {
        "$project":
        {
            "_id": 0,

            "year": 1,
            "population": 1,
            "violent_crime_total": 1,
            "murder_and_nonnegligent_manslaughter_total": 1,
            "legacy_rape_total": 1,
            "revised_rape_total": 1,
            "robbery_total": 1,
            "aggravated_assault_total": 1,
            "violent_crime_rate": 1,
            "murder_and_nonnegligent_manslaughter_rate": 1,
            "legacy_rape_rate": 1,
            "revised_rape_rate": 1,
            "robbery_rate": 1,
            "aggravated_assault_rate": 1,
        
        }
    },
     { "$match" : { "state": state, "year": year } }
    
    ]

    crime_rates = Crime.objects.aggregate(*pipeline)
    print(crime_rates)

    result = []
    for document in crime_rates:
        result.append(document)
    print(result)
    return jsonify(result)