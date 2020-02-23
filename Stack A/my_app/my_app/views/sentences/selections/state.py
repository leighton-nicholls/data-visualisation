from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Sentencing
from flask_mongoengine import mongoengine

@app.route('/getSentencingRatesByYearOnStateLevel/<year>', methods=['GET'])
def getSentencingRatesByYearOnStateLevel(year=None):
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
     { "$match" : { "years.year": int(year), "state": {"$nin": ['Federal', 'Military']} } },
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

@app.route('/getRunningSentencingRatesByYearOnStateLevel/<year>', methods=['GET'])
def getRunningSentencingRatesByYearOnStateLevel(year=None):
    pipeline = [

        {"$unwind": "$years"},
     { "$match" : { 
         "years.year": {"$lte": int(year)}, 
         "state": {"$nin": ['Federal', 'Military']} } },
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
    {
        "$sort": {"count": -1}
    },
    ]
    sentencing_rates = Sentencing.objects.aggregate(*pipeline)
    print(sentencing_rates)

    result = []
    for document in sentencing_rates:
        result.append(document)
    print(result)
    return jsonify(result)
