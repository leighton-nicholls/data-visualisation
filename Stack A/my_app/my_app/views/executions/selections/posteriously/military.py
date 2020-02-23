from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Execution
from datetime import datetime

from flask_mongoengine import mongoengine



@app.route('/getTotalExecutionsOnMilitaryLevelByYearPosteriously/<year>', methods=['GET'])
def getTotalExecutionsOnMilitaryLevelByYearPosteriously(year=None):

    pipeline = [
        
            {
                "$addFields": {
                    "dateFieldYear": {"$year": "$execution_date"}
                }
            },
            {
                "$match": {
                    "dateFieldYear": {"$eq": int(year)},
                    "state": {"$eq": "Military"}
                }
            },
    {
    "$group": {
        "_id": "$execution_method",
        "count": {"$sum": 1}
    }},
    {
        "$sort": {"count": -1}
    },
                {
                 "$project": {"_id": 0, "execution": "$_id", "count": 1}
            },
          ]

  

    executions = Execution.objects.aggregate(*pipeline)
    print(executions)

    result = []
    for document in executions:
        result.append(document)
    print(result)
    return jsonify(result)


@app.route('/getExecutionsMethodsOnMilitaryLevelByYearPosteriously/<year>', methods=['GET'])
def getExecutionsMethodsOnMilitaryLevelByYearPosteriously(year=None):
    pipeline = [
     
                {
                "$addFields": {
                    "dateFieldYear": {"$year": "$execution_date"},
                    "execution_method": "$execution_method"
                }
            },
            {
                "$match": {
                    "dateFieldYear": {"$eq": int(year)},
                    "state": {"$eq": "Military"}
                }
            },

  {
    "$group": {
      "_id": "$state",
      "total": {
        "$sum": 1
      },
       "lethal injection": { 
            "$sum": { 
                "$cond": [
                    { "$eq": [ "$execution_method", "Lethal Injection" ] }, 1, 0
                ]
            }
        },
        "electrocution": { 
            "$sum": { 
                "$cond": [
                    { "$eq": [ "$execution_method", "Electrocution" ] }, 1, 0
                ]
            }
        },
        "gas": { 
            "$sum": { 
                "$cond": [
                    { "$eq": [ "$execution_method", "Gas" ] }, 1, 0
                ]
            }
        },
        "firing squad": { 
            "$sum": { 
                "$cond": [
                    { "$eq": [ "$execution_method", "Firing Squad" ] }, 1, 0
                ]
            }
        },
        "hanging": { 
            "$sum": { 
                "$cond": [
                    { "$eq": [ "$execution_method", "Hanging" ] }, 1, 0
                ]
            }
        },
        
      
      
    }
  },
           {
             "$sort": {"total": -1}
    },
    {
         "$project": {"_id": 0, "state": "$_id", "total": 1, "lethal injection": 1, "electrocution": 1, "gas": 1, "firing squad": 1, "hanging": 1}
    }
  
]

    executions = Execution.objects.aggregate(*pipeline)
    print(executions)

    result = []
    for document in executions:
        result.append(document)
    print(result)
    return jsonify(result)

# This route retrieves all the executions up until the current date. Should the user wish to view future executions, a separate route handles this
@app.route('/getExecutionMethodsSummaryOnMilitaryLevelByYearPosteriously/<year>', methods=['GET'])
def getExecutionMethodsSummaryOnMilitaryLevelByYearPosteriously(year=None):
    pipeline = [
     
                {
                "$addFields": {
                    "dateFieldYear": {"$year": "$execution_date"},
                    "execution_method": "$execution_method"
                }
            },
            {
                "$match": {
                    "dateFieldYear": {"$eq": int(year)},
                    "state": {"$eq":  "Military"}
                }
            },
  {
    "$group": {
      "_id": "$dateFieldYear",
      "total": {
        "$sum": 1
      },  

        "lethal_injection": { 
            "$sum": { 
                "$cond": [
                    { "$eq": [ "$execution_method", "Lethal Injection" ] }, 1, 0
                ]
            }
        },
        "electrocution": { 
            "$sum": { 
                "$cond": [
                    { "$eq": [ "$execution_method", "Electrocution" ] }, 1, 0
                ]
            }
        },
        "gas": { 
            "$sum": { 
                "$cond": [
                    { "$eq": [ "$execution_method", "Gas" ] }, 1, 0
                ]
            }
        },
        "firing_squad": { 
            "$sum": { 
                "$cond": [
                    { "$eq": [ "$execution_method", "Firing Squad" ] }, 1, 0
                ]
            }
        },
        "hanging": { 
            "$sum": { 
                "$cond": [
                    { "$eq": [ "$execution_method", "Hanging" ] }, 1, 0
                ]
            }
        },
    }
  },
           {
             "$sort": {"total": -1}
    },
    {
         "$project": {"_id": 0, "year": "$_id", "total": 1, "lethal_injection": 1, "electrocution": 1, "gas": 1, "firing_squad": 1, "hanging": 1}
    }
]

    executions = Execution.objects.aggregate(*pipeline)
    print(executions)

    result = []
    for document in executions:
        result.append(document)
    print(result)
    return jsonify(result)

