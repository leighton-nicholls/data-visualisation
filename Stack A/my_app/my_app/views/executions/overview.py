from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Execution
from datetime import datetime

from flask_mongoengine import mongoengine

# This includes executions on both a state, federal and military level
@app.route('/getTotalExecutionsOverall', methods=['GET'])
def getTotalExecutionsOverall():

    pipeline = [
        {
       
    "$group": {
        "_id": "$execution_method",
        "count": {"$sum": 1}
    }},
    {
        "$sort": {"count": -1}
    },
    {
        "$project": {"_id": 0, "execution_method": "$_id", "count": 1}
    }
    ]

  

    executions = Execution.objects.aggregate(*pipeline)
    print(executions)

    result = []
    for document in executions:
        result.append(document)
    print(result)
    return jsonify(result)


