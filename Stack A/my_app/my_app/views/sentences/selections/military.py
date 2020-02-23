from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Sentencing
from flask_mongoengine import mongoengine

@app.route('/getSentencingRatesByYearOnMilitaryLevel/<year>', methods=['GET'])
def getSentencingRatesByYearOnMilitaryLevel(year=None):
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
     { "$match" : { "years.year": int(year), "state": {"$eq": 'Military'} } },
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

@app.route('/getRunningSentencingRatesByYearOnMilitaryLevel/<year>', methods=['GET'])
def getRunningSentencingRatesByYearOnMilitaryLevel(year=None):
    pipeline = [

        {"$unwind": "$years"},
     { "$match" : { 
         "years.year": {"$lte": int(year)}, 
         "state": {"$eq": 'Military'} } },
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