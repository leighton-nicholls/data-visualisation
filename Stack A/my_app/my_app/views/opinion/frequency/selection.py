
from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Opinion

from flask_mongoengine import mongoengine


@app.route('/getAllFrequencyOpinionDocuments', methods=['GET'])
def getAllFrequencyOpinionDocuments():
    pipeline = [
    {
        "$project":
        {
            "_id": 0,
            "moral": 1

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

@app.route('/getAllFrequencyOpinionDocumentsByYear/<year>', methods=['GET'])
def getAllFrequencyOpinionDocumentsByYear(year=None):
    pipeline = [
    {
        "$match" : { "year": int(year) }
    },
        {
        "$project":
        {
            "_id": 0,
            "frequency": 1

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


