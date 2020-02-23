from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Execution
from datetime import datetime, date
from flask_mongoengine import mongoengine

@app.route('/getTotalExecutionsOnFederalLevelByYearNonPosteriously/<year>', methods=['GET'])
def getTotalExecutionsOnFederalLevelByYearNonPosteriously(year=None):
    year = int(year)
    today = datetime.today() # or datetime.now to use local timezone
    currentYear = datetime.now().year

    start_date = datetime(year, 1, 1) # gets the start of the year, i.e. '2019-01-01'
    # if the user entered in the current year, i.e. 2019, we want to get all the executions up to the current date, i.e. '2019-10-14'
    # However if they entered in a previous year, we want to get all the executions for that year, i.e. if they enter in 2018 as the year parameter
    # we want all the executions between 2018-01-01 and 2018-12-31. Hence the ternary operator check. December always has 31 days regardless of the year
    end_date = datetime(year=year, month=today.month, day=today.day, hour=0, second=0) if currentYear == year else datetime(year=year, month=12, day=31, hour=0, second=0)

    # now get all the executions in between the start of the year and the current date, i.e. 2019-01-01 to 2019-10-14
    pipeline = [
            {
                "$addFields": {
                    "execution_method": "$execution_method"
                }
            },

            {
                "$match": {
                    "execution_date": { "$gte": start_date, "$lte": end_date},
                    "state": {"$eq": "Federal"}
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



@app.route('/getExecutionsMethodsOnFederalLevelByYearNonPosteriously/<year>', methods=['GET'])
def getExecutionsMethodsOnFederalLevelByYearNonPosteriously(year=None):
    year = int(year)
    today = datetime.today() # or datetime.now to use local timezone
    currentYear = datetime.now().year

    start_date = datetime(year, 1, 1) # gets the start of the year, i.e. '2019-01-01'
    # if the user entered in the current year, i.e. 2019, we want to get all the executions up to the current date, i.e. '2019-10-14'
    # However if they entered in a previous year, we want to get all the executions for that year, i.e. if they enter in 2018 as the year parameter
    # we want all the executions between 2018-01-01 and 2018-12-31. Hence the ternary operator check. December always has 31 days regardless of the year
    end_date = datetime(year=year, month=today.month, day=today.day, hour=0, second=0) if currentYear == year else datetime(year=year, month=12, day=31, hour=0, second=0)

    # now get all the executions in between the start of the year and the current date, i.e. 2019-01-01 to 2019-10-14
    pipeline = [
     
                {
                "$addFields": {
                    "execution_method": "$execution_method"
                }
            },
            {
                 "$match": {
                    "execution_date": { "$gte": start_date, "$lte": end_date},
                    "state": {"$eq": "Federal"}
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
@app.route('/getExecutionMethodsSummaryOnFederalLevelByYearNonPosteriously/<year>', methods=['GET'])
def getExecutionMethodsSummaryOnFederalLevelByYearNonPosteriously(year=None):
    year = int(year)
    today = datetime.today() # or datetime.now to use local timezone
    currentYear = datetime.now().year

    start_date = datetime(year, 1, 1) # gets the start of the year, i.e. '2019-01-01'
    # if the user entered in the current year, i.e. 2019, we want to get all the executions up to the current date, i.e. '2019-10-14'
    # However if they entered in a previous year, we want to get all the executions for that year, i.e. if they enter in 2018 as the year parameter
    # we want all the executions between 2018-01-01 and 2018-12-31. Hence the ternary operator check. December always has 31 days regardless of the year
    end_date = datetime(year=year, month=today.month, day=today.day, hour=0, second=0) if currentYear == year else datetime(year=year, month=12, day=31, hour=0, second=0)

    # now get all the executions in between the start of the year and the current date, i.e. 2019-01-01 to 2019-10-14

    pipeline = [
     
                {
                "$addFields": {
                    "dateFieldYear": {"$year": "$execution_date"},
                    "execution_method": "$execution_method"
                }
            },
            {
                 "$match": {
                    "execution_date": { "$gte": start_date, "$lte": end_date},
                    "state": {"$eq": "Federal"}
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

