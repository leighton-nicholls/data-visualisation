
from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Legal

from flask_mongoengine import mongoengine


@app.route('/getAllLegalDocuments', methods=['GET'])
def getAllLegalDocuments():
    pipeline = [
    {
         "$project": {"_id": 0, "state": 1, "date": 1, "status": 1}
    }
]

    legal = Legal.objects.aggregate(*pipeline)
    print(legal)

    result = []
    for document in legal:
        result.append(document)
    print(result)
    return jsonify(result)



@app.route('/getLegalStatusByYearOnStateLevel/<year>', methods=['GET'])
def getLegalStatusByYearOnStateLevel(year=None):
    year = int(year)



    pipeline = [
        {
            "$project":
            {
            "_id": 0,

            "state": {"$trim": {"input": "$state"}},
            "date": 1,
            "year": { "$year": "$date" },
            "status": {"$trim": {"input": "$status"}}
            }
        },
        {
             "$match": {"year": {"$lte": year}, "state": {"$nin": ['Federal', 'Military']}}
        },
        {
            "$sort": {"date": -1}
        },
        {
            "$group":
            {
                "_id": "$state",
                "date": {"$first": "$date"},
                "status": {"$first": "$status"}
            }
        },
        {
            "$sort": {"date": -1}
        },
        {
             "$project": {"_id": 0, "state": "$_id", "date": "$date", "status": "$status"}
        },
    ]

    legal = Legal.objects.aggregate(*pipeline)
    print(legal)

    result = []
    for document in legal:
        result.append(document)
    print(result)
    return jsonify(result)

@app.route('/getLegalStatusByYearOnFederalLevel/<year>', methods=['GET'])
def getLegalStatusByYearOnFederalLevel(year=None):
    year = int(year)

    pipeline = [
        {
            "$project":
            {
            "_id": 0,

            "state": {"$trim": {"input": "$state"}},
            "date": 1,
            "year": { "$year": "$date" },
              "status": {"$trim": {"input": "$status"}}
            }
        },
        {
             "$match": {"year": {"$lte": year}, "state": {"$eq": 'Federal'}}
        },
        {
            "$sort": {"date": -1}
        },
        {
            "$group":
            {
                "_id": "$state",
                "date": {"$first": "$date"},
                "status": {"$first": "$status"}
            }
        },
        {
            "$sort": {"date": -1}
        },
        {
             "$project": {"_id": 0, "state": "$_id", "date": "$date", "status": "$status"}
        },
    ]

    legal = Legal.objects.aggregate(*pipeline)
    print(legal)

    result = []
    for document in legal:
        result.append(document)
    print(result)
    return jsonify(result)

@app.route('/getLegalStatusByYearOnMilitaryLevel/<year>', methods=['GET'])
def getLegalStatusByYearOnMilitaryLevel(year=None):
    year = int(year)

    pipeline = [
        {
            "$project":
            {
            "_id": 0,

            "state": {"$trim": {"input": "$state"}},
            "date": 1,
            "year": { "$year": "$date" },
            "status": {"$trim": {"input": "$status"}}
            }
        },
        {
             "$match": {"year": {"$lte": year}, "state": {"$eq": 'Military'}}
        },
        {
            "$sort": {"date": -1}
        },
        {
            "$group":
            {
                "_id": "$state",
                "date": {"$first": "$date"},
                "status": {"$first": "$status"}
            }
        },
        {
            "$sort": {"date": -1}
        },
        {
             "$project": {"_id": 0, "state": "$_id", "date": "$date", "status": "$status"}
        },
    ]

    legal = Legal.objects.aggregate(*pipeline)
    print(legal)

    result = []
    for document in legal:
        result.append(document)
    print(result)
    return jsonify(result)

