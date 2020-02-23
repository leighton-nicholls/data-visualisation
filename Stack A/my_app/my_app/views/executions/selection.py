from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Execution
from datetime import datetime

from flask_mongoengine import mongoengine

@app.route('/getAllExecutionDocuments', methods=['GET'])
def getAllExecutionDocuments():
    pipeline = [
    {
         "$project": {"_id": 0}
    }
]

    executions = Execution.objects.aggregate(*pipeline)
    print(executions)

    result = []
    for document in executions:
        result.append(document)
    print(result)
    return jsonify(result)