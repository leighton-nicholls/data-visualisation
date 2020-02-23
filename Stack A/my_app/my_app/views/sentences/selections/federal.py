from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Sentencing
from flask_mongoengine import mongoengine

@app.route('/getSentencingRatesByYearOnFederalLevel/<year>', methods=['GET'])
def getSentencingRatesByYearOnFederalLevel(year=None):
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
     { "$match" : { "years.year": int(year), "state": {"$eq": 'Federal'} } },
    {
        "$sort": {"years.sentence": -1}
    },
    ]

    sentencing_rates = Sentencing.objects.aggregate(*pipeline)
    print(sentencing_rates)

    result = []
    for document in sentencing_rates:
        result.append(document)
    print(result)
    return jsonify(result)

@app.route('/getRunningSentencingRatesByYearOnFederalLevel/<year>', methods=['GET'])
def getRunningSentencingRatesByYearOnFederalLevel(year=None):
    pipeline = [

        {"$unwind": "$years"},
     { "$match" : { 
         "years.year": {"$lte": int(year)}, 
         "state": {"$eq": 'Federal'} } },
    {
        "$group": {
        "_id": "$state",
        "count": { "$sum": "$years.sentence"},
    }},
        {        
        "$project":
        {
            "_id": 0,

            "state": "$_id",
            "count": 1,
        
        }
    },
    ]
    sentencing_rates = Sentencing.objects.aggregate(*pipeline)
    print(sentencing_rates)

    result = []
    for document in sentencing_rates:
        result.append(document)
    print(result)
    return jsonify(result)