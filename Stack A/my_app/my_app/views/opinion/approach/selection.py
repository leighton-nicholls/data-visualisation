
from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Opinion

from flask_mongoengine import mongoengine


@app.route('/getAllApproachOpinionDocuments', methods=['GET'])
def getAllApproachOpinionDocuments():
    pipeline = [
    {
        "$project":
        {
            "_id": 0,
            "approach": 1

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

@app.route('/getAllApproachOpinionDocumentsByYear/<year>', methods=['GET'])
def getAllApproachOpinionDocumentsByYear(year=None):
    pipeline = [
    {
        "$match" : { "year": int(year) }
    },
        {
        "$project":
        {
            "_id": 0,
            "approach": 1

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


