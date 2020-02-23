
from my_app import app
from flask import jsonify, request, render_template
from my_app.mongodb import Opinion

from flask_mongoengine import mongoengine


@app.route('/updateOpinionDocument', methods=['PUT'])
def updateOpinionDocument(): 
    if request.method == 'PUT':
        try: 
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID =  int(raw_id) if helper.isInteger(raw_id) is True else 0

                year = request.args.get('year') if request.args.get('year') is not None else '00/00/1970'
                raw_favour = request.args.get('favour') if request.args.get('favour') is not None else 0
                raw_disfavour = request.args.get('disfavour') if request.args.get('disfavour') is not None else 0
                raw_neutral = request.args.get('neutral') if request.args.get('neutral') is not None else 0

                favour = int(raw_favour) if helper.isInteger(raw_favour) is True else 0
                disfavour = int(raw_disfavour) if helper.isInteger(raw_disfavour) is True else 0
                neutral = int(raw_neutral) if helper.isInteger(raw_neutral) is True else 0

                Opinion.objects.filter(_id=retrievedID).update(
                        year=year,
                        favour = favour,
                        disfavour = disfavour,
                        neutral = neutral,
                )

                result = 200
                return ('Successfully updated opinion document!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:
                result = 500
                return ('Failed to update opinion document!', result, error)


@app.route('/updateOpinionYear', methods=['PATCH'])
def updateOpinionYear(): 
    if request.method == 'PATCH':
        try:
                raw_id = request.args.get('id') if request.args.get('id') is not None else 0
                retrievedID =  int(raw_id) if helper.isInteger(raw_id) is True else 0

                year = request.args.get('year') if request.args.get('year') is not None else '00/00/1970'
                
                Opinion.objects.filter(_id=retrievedID).update(
                        year = year,
                )

                result = 200
                return ('Successfully updated opinion year!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update opinion year!', result, error)

@app.route('/updateOpinionFavour', methods=['PATCH'])
def updateOpinionFavour(): 
    if request.method == 'PATCH':
        try:
                year = request.args.get('year') if request.args.get('year') is not None else '00/00/1970'
                raw_favour = request.args.get('favour') if request.args.get('favour') is not None and len(request.args.get('favour')) > 0 else 0
                favour = int(raw_favour) if helper.isInteger(raw_favour) is True else 0

                Opinion.objects.filter(year=year).update(
                        favour = favour,
                )

                result = 200
                return ('Successfully updated opinion favour!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update opinion favour!', result, error)

@app.route('/updateOpinionDisfavour', methods=['PATCH'])
def updateOpinionDisfavour(): 
    if request.method == 'PATCH':
        try:
                year = request.args.get('year') if request.args.get('year') is not None else '00/00/1970'
                raw_disfavour = request.args.get('disfavour') if request.args.get('disfavour') is not None else 0
                disfavour = int(raw_disfavour) if helper.isInteger(raw_disfavour) is True else 0

                Opinion.objects.filter(year=year).update(
                        disfavour = disfavour,
                )

                result = 200
                return ('Successfully updated opinion disfavour!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update opinion disfavour!', result, error)

@app.route('/updateOpinionNeutral', methods=['PATCH'])
def updateOpinionNeutral(): 
    if request.method == 'PATCH':
        try:
                year = request.args.get('year') if request.args.get('year') is not None else '00/00/1970'
                raw_neutral = request.args.get('neutral') if request.args.get('neutral') is not None else 0
                neutral = int(raw_neutral) if helper.isInteger(raw_neutral) is True else 0

                Opinion.objects.filter(year=year).update(
                        neutral = neutral,
                )

                result = 200
                return ('Successfully updated opinion neutral!', result)
        except mongoengine.errors.OperationError or mongoengine.errors.ValidationError as error:

                result = 500
                return ('Failed to update opinion neutral!', result, error)