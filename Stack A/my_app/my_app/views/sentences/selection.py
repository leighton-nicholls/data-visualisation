from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Sentencing
from flask_mongoengine import mongoengine


@app.route('/getAllSentencingDocuments', methods=['GET'])
def getAllSentencingDocuments():
    pipeline = [
    {
        "$project":
        {
            "_id": 0,

            "state": 1,
            "years": 1
        }
    }
    ]

    sentences = Sentencing.objects.aggregate(*pipeline)
    print(sentences)

    result = []
    for document in sentences:
        result.append(document)
    print(result)
    return jsonify(result)