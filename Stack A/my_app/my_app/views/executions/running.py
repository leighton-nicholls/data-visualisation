from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Execution
from datetime import datetime

from flask_mongoengine import mongoengine


# this route will return the running totals dependent upon the date passed in. For example, in 1977 in the state of Utah there was one execution
# years later there will be another execution. Therefore, summarise that as 'two' (2), not one which is simply by state
# essentially, this route serves as a running total, it looks at the bigger picture and returns the number of executions for the given states up until the specified point in time
@app.route('/getRunningExecutionMethodsSummaryTotalOnStateLevel/<year>', methods=['GET'])
def getRunningExecutionMethodsSummaryTotalOnStateLevel(year=None):
    pipeline = [
     
                {
                "$addFields": {
                    "dateFieldYear": {"$year": "$execution_date"},
                    "execution_method": "$execution_method"
                }
            },
            {
                "$match": {
                    "dateFieldYear": {"$lte": int(year)},
                    "state": {"$nin": ["Federal", "Military"]}
                }
            },
  {
    "$group": {
      "_id": "$state",
      "state": {"$first": "$state"},
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
         "$project": {"_id": 0, "state": 1, "total": 1, "lethal_injection": 1, "electrocution": 1, "gas": 1, "firing_squad": 1, "hanging": 1}
    }
]

    executions = Execution.objects.aggregate(*pipeline)
    print(executions)

    result = []
    for document in executions:
        result.append(document)
    print(result)
    return jsonify(result)


# this route will return the running totals dependent upon the date passed in. For example, in 1977 in the state of Utah there was one execution
# years later there will be another execution. Therefore, summarise that as 'two' (2), not one which is simply by state
# essentially, this route serves as a running total, it looks at the bigger picture and returns the number of executions for the given states up until the specified point in time
@app.route('/getRunningExecutionMethodsSummaryTotalOnFederalLevel/<year>', methods=['GET'])
def getRunningExecutionMethodsSummaryTotalOnFederalLevel(year=None):
    pipeline = [
     
                {
                "$addFields": {
                    "dateFieldYear": {"$year": "$execution_date"},
                    "execution_method": "$execution_method"
                }
            },
            {
                "$match": {
                    "dateFieldYear": {"$lte": int(year)},
                    "state": {"$eq": "Federal"}
                }
            },
  {
    "$group": {
      "_id": "$state",
      "state": {"$first": "$state"},
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
         "$project": {"_id": 0, "state": 1, "total": 1, "lethal_injection": 1, "electrocution": 1, "gas": 1, "firing_squad": 1, "hanging": 1}
    }
]

    executions = Execution.objects.aggregate(*pipeline)
    print(executions)

    result = []
    for document in executions:
        result.append(document)
    print(result)
    return jsonify(result)



# this route will return the running totals dependent upon the date passed in. For example, in 1977 in the state of Utah there was one execution
# years later there will be another execution. Therefore, summarise that as 'two' (2), not one which is simply by state
# essentially, this route serves as a running total, it looks at the bigger picture and returns the number of executions for the given states up until the specified point in time
@app.route('/getRunningExecutionMethodsSummaryTotalOnMilitaryLevel/<year>', methods=['GET'])
def getRunningExecutionMethodsSummaryTotalOnMilitaryLevel(year=None):
    pipeline = [
     
                {
                "$addFields": {
                    "dateFieldYear": {"$year": "$execution_date"},
                    "execution_method": "$execution_method"
                }
            },
            {
                "$match": {
                    "dateFieldYear": {"$lte": int(year)},
                    "state": {"$eq": "Military"}
                }
            },
  {
    "$group": {
      "_id": "$state",
      "state": {"$first": "$state"},
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
         "$project": {"_id": 0, "state": 1, "total": 1, "lethal_injection": 1, "electrocution": 1, "gas": 1, "firing_squad": 1, "hanging": 1}
    }
]

    executions = Execution.objects.aggregate(*pipeline)
    print(executions)

    result = []
    for document in executions:
        result.append(document)
    print(result)
    return jsonify(result)
