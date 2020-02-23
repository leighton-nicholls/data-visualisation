from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Sentencing
from flask_mongoengine import mongoengine


@app.route('/getAllSentencingRates', methods=['GET'])
def getAllSentencingRates():
    pipeline = [
    {
        "$project":
        {
            "_id": 0,

            "state": 1,
            "years": 1,
        
        }
    }
    ]

    sentencing_rates = Sentencing.objects.aggregate(*pipeline)
    print(sentencing_rates)

    result = []
    for document in sentencing_rates:
        result.append(document)
    print(result)
    return jsonify(result)



@app.route('/getAllSentencingRatesByState/<state>', methods=['GET'])
def getAllSentencingRatesByState(state=None):
    print("State: ", state)

    pipeline = [
    {
        "$project":
        {
            "_id": 0,

            "state": 1,
            "years": 1,
        
        }
    },
    {"$unwind": "$years"},
    { "$match" : { "state": state } },
    {"$sort": {"years.year": -1}}
    ]

    sentencing_rates = Sentencing.objects.aggregate(*pipeline)
    print(sentencing_rates)

    result = []
    for document in sentencing_rates:
        result.append(document)
    print(result)
    return jsonify(result)



@app.route('/getSentencingRateByStateByYear', methods=['GET'])
def getSentencingRateByStateByYear():
    # since there are multiple API parameters, easier to retrieve them this way
    state  = request.args.get('state', None)
    year  = int(request.args.get('year', None))

    pipeline = [
    {
        "$project":
        {
            "_id": 0,

            "state": 1,
            "years.year": 1,
            "years.sentence": 1,
        
        }
    },
    {"$unwind": "$years"},
    {"$match": {"years.year": year, "state": state}}
    ]

    sentencing_rates = Sentencing.objects.aggregate(*pipeline)
    print(sentencing_rates)

    result = []
    for document in sentencing_rates:
        result.append(document)
    print(result)
    return jsonify(result)