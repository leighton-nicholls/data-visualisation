from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Execution
from datetime import datetime

from flask_mongoengine import mongoengine

# if the user has checked the checkbox, extend the slider to go forwards to the latest date of whatever is in the database
# For example, if the current year is 2019, but a state has scheduled an execution in 2022, the slider will expand its ending year
# to be in 2022 so the user can see the scheduled executions up to that point
# The slider will still allow the possibility of going back to previous years, i.e. 1975
@app.route('/getSliderYearsOnStateLevelPosteriously', methods=['GET'])
def getSliderYearsOnStateLevelPosteriously():
    currentYear = datetime.now().year

    pipeline = [
     {
         "$match": {
        "state": {"$nin": ['Federal', 'Military']}
        }
    },
    {
        '$group': { '_id': {}, "endingYear": {'$max': {"$year": "$execution_date"}}}
    },
    {
        "$project": {
            "_id": 0, 
            'endingYear': {
                "$cond": { "if": { "$lt": [ "$endingYear", currentYear ] }, "then": currentYear, "else": "$endingYear" }
            }
        }
    }
    ]
   
    executions = Execution.objects.aggregate(*pipeline)
    print(executions)

    result = []
    for document in executions:
        result.append(document)
    print(result)
    return jsonify(result)

# if the user has checked the checkbox, extend the slider to go forwards to the latest date of whatever is in the database
# For example, if the current year is 2019, but a state has scheduled an execution in 2022, the slider will expand its ending year
# to be in 2022 so the user can see the scheduled executions up to that point
# The slider will still allow the possibility of going back to previous years, i.e. 1975
@app.route('/getSliderYearsOnFederalLevelPosteriously', methods=['GET'])
def getSliderYearsOnFederalLevelPosteriously():
    currentYear = datetime.now().year

    pipeline = [
        {
         "$match": {
        "state": {"$eq": 'Federal'}
        }
    },
    {
        '$group': { '_id': {}, "endingYear": {'$max': {"$year": "$execution_date"}}}
    },
    {
        "$project": {
            "_id": 0, 
            'endingYear': {
                 "$cond": { "if": { "$lt": [ "$endingYear", currentYear ] }, "then": currentYear, "else": "$endingYear" }
            }
        }
    }
    ]
   
    executions = Execution.objects.aggregate(*pipeline)
    print(executions)

    result = []
    for document in executions:
        result.append(document)
    print(result)
    return jsonify(result)


# if the user has checked the checkbox, extend the slider to go forwards to the latest date of whatever is in the database
# For example, if the current year is 2019, but a state has scheduled an execution in 2022, the slider will expand its ending year
# to be in 2022 so the user can see the scheduled executions up to that point
# The slider will still allow the possibility of going back to previous years, i.e. 1975
@app.route('/getSliderYearsOnMilitaryLevelPosteriously', methods=['GET'])
def getSliderYearsOnMilitaryLevelPosteriously():
    currentYear = datetime.now().year

    pipeline = [
             {
         "$match": {
        "state": {"$eq": 'Military'}
        }
    },
    {
        '$group': { '_id': {}, "endingYear": {'$max': {"$year": "$execution_date"}}}
    },
    {
        "$project": {
            "_id": 0,
            'endingYear': {
                 "$cond": { "if": { "$lt": [ "$endingYear", currentYear ] }, "then": currentYear, "else": "$endingYear" }
            }
        }
    }
    ]
   
    executions = Execution.objects.aggregate(*pipeline)
    print(executions)

    result = []
    for document in executions:
        result.append(document)
    print(result)
    return jsonify(result)

