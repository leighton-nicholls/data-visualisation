
from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Opinion

from flask_mongoengine import mongoengine


@app.route('/getAllMurderOpinionDocuments', methods=['GET'])
def getAllMurderOpinionDocuments():
    pipeline = [
    {
        "$project":
        {
            "_id": 0,
            "murder": 1

        }
    }
    ]

    opinions = Opinion.objects.aggregate(*pipeline)
    print(opinions)

    result = []
    for document in opinions:
        result.append(document)
    print(result)
    return jsonify(result)

@app.route('/getAllMurderOpinionDocumentsByYear/<year>', methods=['GET'])
def getAllMurderOpinionDocumentsByYear(year=None):
    pipeline = [
        
    {
        "$match" : { "year": int(year) }
    },
    
        {"$unwind": "$murder"},
    {
        "$group":
        {
            "_id": "$year",
            
            "favour": {"$last": "$murder.favour"},
            
            "disfavour": {"$last": "$murder.disfavour"},
            
            "neutral": {"$last": "$murder.neutral"},
            
            "from_date": {"$last": "$murder.from_date"},
            "to_date": {"$last": "$murder.to_date"},
        }
    },
    {
        "$project":
        {
            "_id": 0,
            "favour": 1,
            "disfavour": 1,
            "neutral": 1,
            "from_date": 1,
            "to_date": 1

        }
    },
    ]

    opinions = Opinion.objects.aggregate(*pipeline)
    print(opinions)

    result = []
    for document in opinions:
        result.append(document)
    print(result)
    return jsonify(result)


