from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Innocence
from datetime import datetime

from flask_mongoengine import mongoengine

@app.route('/getAllInnocenceDocuments', methods=['GET'])
def getAllInnocenceDocuments():
    pipeline = [
    {
         "$project": {"_id": 0}
    }
]

    innocence = Innocence.objects.aggregate(*pipeline)
    print(innocence)

    result = []
    for document in innocence:
        result.append(document)
    print(result)
    return jsonify(result)


@app.route('/getInnocenceExonerationsByStateAndYear', methods=['GET'])
def getInnocenceByStateAndYear():
    state  = request.args.get('state', None)
    year  = int(request.args.get('year', None))


    pipeline = [
    { "$match" : { "exonerated": year, "state": state }, },
    {
         "$project": {"_id": 0}
    }
]

    innocence = Innocence.objects.aggregate(*pipeline)
    print(innocence)

    result = []
    for document in innocence:
        result.append(document)
    print(result)
    return jsonify(result)


@app.route('/getInnocenceDocumentsOnStateLevelByYear/<year>', methods=['GET'])
def getInnocenceDocumentsOnStateLevelByYear(year=None):
    pipeline = [
    { 
        "$match" : { "exonerated": int(year), "state": {"$nin": ["Federal", 'Military']}  } 
    },
    {
        "$group": {
            "_id": "$state",
            "year": {"$max": "$exonerated"},
            "total": {"$sum": 1}
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

    innocence = Innocence.objects.aggregate(*pipeline)
    print(innocence)

    result = []
    for document in innocence:
        result.append(document)
    print(result)
    return jsonify(result)

@app.route('/getInnocenceDocumentsOnFederalLevelByYear/<year>', methods=['GET'])
def getInnocenceDocumentsOnFederalLevelByYear(year=None):
    pipeline = [
    { 
        "$match" : { "exonerated": int(year), "state": {"$eq": "Federal"}  } 
    },
    {
        "$group": {
            "_id": "null",
            "year": {"$max": "$exonerated"},
            "total": {"$sum": 1}
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

    innocence = Innocence.objects.aggregate(*pipeline)
    print(innocence)

    result = []
    for document in innocence:
        result.append(document)
    print(result)
    return jsonify(result)

@app.route('/getInnocenceDocumentsOnMilitaryLevelByYear/<year>', methods=['GET'])
def getInnocenceDocumentsOnMilitaryLevelByYear(year=None):
    pipeline = [
    { 
        "$match" : { "exonerated": int(year), "state": {"$eq": "Military"}  } 
    },
    {
        "$group": {
            "_id": "null",
            "year": {"$max": "$exonerated"},
            "total": {"$sum": 1}
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

    innocence = Innocence.objects.aggregate(*pipeline)
    print(innocence)

    result = []
    for document in innocence:
        result.append(document)
    print(result)
    return jsonify(result)



@app.route('/getRunningInnocenceDocumentsOnStateLevelByYear/<year>', methods=['GET'])
def getRunningInnocenceDocumentsOnStateLevelByYear(year=None):
    pipeline = [
    { 
        "$match" : { "exonerated": {"$lte": int(year)}, "state": {"$nin": ["Federal", 'Military']}  } 
    },
    {
        "$group": {
            "_id": "$state",
            "year": {"$max": "$exonerated"},
            "total": {"$sum": 1}
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

    innocence = Innocence.objects.aggregate(*pipeline)
    print(innocence)

    result = []
    for document in innocence:
        result.append(document)
    print(result)
    return jsonify(result)

@app.route('/getRunningInnocenceDocumentsOnFederalLevelByYear/<year>', methods=['GET'])
def getRunningInnocenceDocumentsOnFederalLevelByYear(year=None):
    pipeline = [
    { 
        "$match" : { "exonerated": {"$lte": int(year)}, "state": {"$eq": "Federal"}  } 
    },
    {
        "$group": {
            "_id": "null",
            "year": {"$max": "$exonerated"},
            "total": {"$sum": 1}
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

    innocence = Innocence.objects.aggregate(*pipeline)
    print(innocence)

    result = []
    for document in innocence:
        result.append(document)
    print(result)
    return jsonify(result)

@app.route('/getRunningInnocenceDocumentsOnMilitaryLevelByYear/<year>', methods=['GET'])
def getRunningInnocenceDocumentsOnMilitaryLevelByYear(year=None):
    pipeline = [
    { 
        "$match" : { "exonerated": {"$lte": int(year)}, "state": {"$eq": "Military"}  } 
    },
    {
        "$group": {
            "_id": "null",
            "year": {"$max": "$exonerated"},
            "total": {"$sum": 1}
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

    innocence = Innocence.objects.aggregate(*pipeline)
    print(innocence)

    result = []
    for document in innocence:
        result.append(document)
    print(result)
    return jsonify(result)