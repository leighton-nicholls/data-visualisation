
from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Legal

from flask_mongoengine import mongoengine


@app.route('/getLegalStatusSummaryByYearOnStateLevel/<year>', methods=['GET'])
def getLegalStatusSummaryByYearOnStateLevel(year=None):
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
        "$group": {
            "_id": "$_id",

        "retentionist": { 
            "$sum": { 
                "$cond": [
                    { "$not": [{ "$anyElementTrue": { "$map": {
                        "input": [ 'Abolished', 'Moratorium' ],
                        "as": "el",
                        "in": { "$eq": [ "$$el", "$id" ] }
                    }}}]},
                    1,
                    0
                ]
            }
        },
        "abolished": { 
            "$sum": { 
                "$cond": [
                    { "$eq": [ "$status", "Abolished" ] }, 1, 0
                ]
            }
        },
        "moratorium": { 
            "$sum": { 
                "$cond": [
                    { "$eq": [ "$status", "Moratorium" ] }, 1, 0
                ]
            }
        },
        }
        },
        {
              
             "$project": {"_id": 0, "retentionist": 1, "abolished": 1, "moratorium": 1}
        },
    ]

    legal = Legal.objects.aggregate(*pipeline)
    print(legal)

    result = []
    for document in legal:
        result.append(document)
    print(result)
    return jsonify(result)