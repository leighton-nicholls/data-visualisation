
from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Opinion

from flask_mongoengine import mongoengine


@app.route('/getAllOpinionDocuments', methods=['GET'])
def getAllOpinionDocuments():
    pipeline = [
    {
        "$project":
        {
            "_id": 0,

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