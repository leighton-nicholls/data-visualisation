
from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Opinion

from flask_mongoengine import mongoengine


@app.route('/getAllEquitableOpinionDocuments', methods=['GET'])
def getAllEquitableOpinionDocuments():
    pipeline = [
    {
        "$project":
        {
            "_id": 0,
            "equitable": 1

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

@app.route('/getAllEquitableOpinionDocumentsByYear/<year>', methods=['GET'])
def getAllEquitableOpinionDocumentsByYear(year=None):
    pipeline = [
    {
        "$match" : { "year": int(year) }
    },
        {
        "$project":
        {
            "_id": 0,
            "equitable": 1

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


