from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import DeathRow
from datetime import datetime

from flask_mongoengine import mongoengine

@app.route('/getAllDeathRowDocuments', methods=['GET'])
def getAllDeathRowDocuments():
    pipeline = [
    {
         "$project": {"_id": 0}
    }
]

    death_row = DeathRow.objects.aggregate(*pipeline)
    print(death_row)

    result = []
    for document in death_row:
        result.append(document)
    print(result)
    return jsonify(result)

@app.route('/getAllDeathRowDocumentsByYear/<year>', methods=['GET'])
def getAllDeathRowDocumentsByYear(year=None):
    pipeline = [
    {
        "$project":
        {
            "_id": 0,
            "state": 1,
            "date": 1,
            "total": 1,
            "races": 1,

        "year": {"$year": "$date"}
        }
    },
    { "$match" : { "year": int(year) } },
    {
        "$project": 
        {
            "year": 0
        }
    }
]

    death_row = DeathRow.objects.aggregate(*pipeline)
    print(death_row)

    result = []
    for document in death_row:
        result.append(document)
    print(result)
    return jsonify(result)

@app.route('/getAllDeathRowDocumentsByState/<state>', methods=['GET'])
def getAllDeathRowDocumentsByState(state=None):
    pipeline = [
    {
        "$project":
        {
            "_id": 0,
            "state": 1,
            "date": 1,
            "total": 1,
            "races": 1,
        }
    },
    { "$match" : { "state": state } }
]

    death_row = DeathRow.objects.aggregate(*pipeline)
    print(death_row)

    result = []
    for document in death_row:
        result.append(document)
    print(result)
    return jsonify(result)

@app.route('/getAllDeathRowDocumentsByStateAndYear', methods=['GET'])
def getAllDeathRowDocumentsByStateAndYear():
    state = request.args.get('state', None)
    year  = int(request.args.get('year', None))

    pipeline = [
    {
        "$project":
        {
            "_id": 0,
            "state": 1,
            "date": 1,
            "total": 1,
            "races": 1,

            "year": {"$year": "$date"}  
        }
    },
    { "$match" : { "state": state, "year": year } }
]

    death_row = DeathRow.objects.aggregate(*pipeline)
    print(death_row)

    result = []
    for document in death_row:
        result.append(document)
    print(result)
    return jsonify(result)


@app.route('/getAllDeathRowDocumentsByYearOnStateLevel/<year>', methods=['GET'])
def getAllDeathRowDocumentsByYearOnStateLevel(year=None):
    pipeline = [
    {
        "$project":
        {
            "_id": 0,
            "state": 1,
            "date": 1,
            "total": 1,
            "races": 1,

        "year": {"$year": "$date"}
        }
    },
    { 
        "$match" : { "year": int(year), "state": {"$nin": ["Federal", 'Military']}  } 
    },
    {
        "$group": {
            "_id": "$state",
            "year": {"$max": "$year"},
            "total": {"$first": "$total"}
        }
    },
    {
        "$sort": {"total": -1}
    },
    {
        "$project": 
        {
            "_id": 0,
            "state": "$_id",
            "year": 1,
            "total": 1
        }
    }
]

    death_row = DeathRow.objects.aggregate(*pipeline)
    print(death_row)

    result = []
    for document in death_row:
        result.append(document)
    print(result)
    return jsonify(result)


@app.route('/getAllDeathRowDocumentsByYearOnFederalLevel/<year>', methods=['GET'])
def getAllDeathRowDocumentsByYearOnFederalLevel(year=None):
    pipeline = [
    {
        "$project":
        {
            "_id": 0,
            "state": 1,
            "date": 1,
            "total": 1,
            "races": 1,

        "year": {"$year": "$date"}
        }
    },
    { "$match" : { 
            "year": int(year),  
            "state": {"$eq": "Federal"} 
    }
    },
    {
        "$group": {
            "_id": "null",
            "state": {"$first": "$state"},
            "year": {"$max": "$year"},
            "total": {"$first": "$total"}
        }
    },
    {
        "$project": 
        {
            "_id": 0,
            "state": 1,
            "year": 1,
            "total": 1
        }
    }
    ]

    death_row = DeathRow.objects.aggregate(*pipeline)
    print(death_row)

    result = []
    for document in death_row:
        result.append(document)
    print(result)
    return jsonify(result)



@app.route('/getAllDeathRowDocumentsByYearOnMilitaryLevel/<year>', methods=['GET'])
def getAllDeathRowDocumentsByYearOnMilitaryLevel(year=None):
    pipeline = [
    {
        "$project":
        {
            "_id": 0,
            "state": 1,
            "date": 1,
            "total": 1,
            "races": 1,

        "year": {"$year": "$date"}
        }
    },
    { "$match" : { 
        "year": int(year),  
        "state": {"$eq": "Military"} 
    }
    },
    {
        "$group": {
            "_id": "null",
            
            "state": {"$first": "$state"},
            "year": {"$max": "$year"},
            "total": {"$first": "$total"}
        }
    },
    {
        "$project": 
        {
            "_id": 0,
            
            "state": 1,
            "year": 1,
            "total": 1
        }
    }
]

    death_row = DeathRow.objects.aggregate(*pipeline)
    print(death_row)

    result = []
    for document in death_row:
        result.append(document)
    print(result)
    return jsonify(result)


@app.route('/getRunningDeathRowDocumentsByYearOnStateLevel/<year>', methods=['GET'])
def getRunningDeathRowDocumentsByYearOnStateLevel(year=None):
    pipeline = [
    {
        "$project":
        {
            "_id": 0,
            "state": 1,
            "date": 1,
            "total": 1,
            "races": 1,

        "year": {"$year": "$date"}
        }
    },
    { 
        "$match" : { "year": {"$lte": int(year)}, "state": {"$nin": ["Federal", 'Military']}  } 
    },
    {
        "$group": {
            "_id": "$state",
            "year": {"$last": "$year"},
            "total": {"$sum": "$total"}
        }
    },
    {
        "$sort": {"total": -1}
    },
    {
        "$project": 
        {
            "_id": 0,
            "state": "$_id",
            "year": 1,
            "total": 1
        }
    }
]

    death_row = DeathRow.objects.aggregate(*pipeline)
    print(death_row)

    result = []
    for document in death_row:
        result.append(document)
    print(result)
    return jsonify(result)


@app.route('/getRunningDeathRowDocumentsByYearOnFederalLevel/<year>', methods=['GET'])
def getRunningDeathRowDocumentsByYearOnFederalLevel(year=None):
    pipeline = [
    {
        "$project":
        {
            "_id": 0,
            "state": 1,
            "date": 1,
            "total": 1,
            "races": 1,

        "year": {"$year": "$date"}
        }
    },
    { "$match" : { 
            "year": {"$lte": int(year)}, 
            "state": {"$eq": "Federal"} 
    }
    },
    {
        "$group": {
            "_id": "null",
            "state": {"$first": "$state"},
            "year": {"$last": "$year"},
            "total": {"$sum": "$total"}
        }
    },
    {
        "$project": 
        {
            "_id": 0,
            "state": 1,
            "year": 1,
            "total": 1
        }
    }
    ]

    death_row = DeathRow.objects.aggregate(*pipeline)
    print(death_row)

    result = []
    for document in death_row:
        result.append(document)
    print(result)
    return jsonify(result)



@app.route('/getRunningDeathRowDocumentsByYearOnMilitaryLevel/<year>', methods=['GET'])
def getRunningDeathRowDocumentsByYearOnMilitaryLevel(year=None):
    pipeline = [
    {
        "$project":
        {
            "_id": 0,
            "state": 1,
            "date": 1,
            "total": 1,
            "races": 1,

        "year": {"$year": "$date"}
        }
    },
    { "$match" : { 
        "year": {"$lte": int(year)}, 
        "state": {"$eq": "Military"} 
    }
    },
    {
        "$group": {
            "_id": "null",
            
            "state": {"$first": "$state"},
            "year": {"$last": "$year"},
            "total": {"$sum": "$total"}
        }
    },
    {
        "$project": 
        {
            "_id": 0,
            
            "state": 1,
            "year": 1,
            "total": 1
        }
    }
]

    death_row = DeathRow.objects.aggregate(*pipeline)
    print(death_row)

    result = []
    for document in death_row:
        result.append(document)
    print(result)
    return jsonify(result)