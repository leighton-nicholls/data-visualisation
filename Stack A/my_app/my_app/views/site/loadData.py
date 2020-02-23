from my_app import app, helperFunctions as helper
from my_app.static.constants import constants as constants
from flask import jsonify, request, render_template
from os import walk
from datetime import datetime
from dateutil import parser
import datetime as dt
from my_app.mongodb import Opinion, Execution, Crime, Legal, Sentencing, Innocence, DeathRow 
import os, csv, json, re, difflib
from bson.binary import Binary
import pickle
from bson import json_util
from flask_mongoengine import mongoengine

result = []

murderOpinionBuilder = {}
moralOpinionBuilder = {}
frequencyOpinionBuilder = {}
equitableOpinionBuilder = {}
approachOpinionBuilder = {}


def insertNewCrimeDocument(data, formattedPath):
    crime = Crime()

    # Some extra checking, parsing with floats and ints seems a little overkill but is necessary as there is some missing data 
    
    year = int(data[0]) if helper.isInteger(data[0]) is True else 0
    stateName = os.path.splitext(formattedPath.title())[0]
    population = int(data[1]) if helper.isInteger(data[1]) is True else 0
    violent_crime_total = int(data[2]) if helper.isInteger(data[2]) is True else 0
    murder_and_nonnegligent_manslaughter_total = int(data[3]) if helper.isInteger(data[3]) is True else 0
    legacy_rape_total = int(data[4]) if helper.isInteger(data[4]) is True else 0
    revised_rape_total = int(data[5]) if helper.isInteger(data[5]) is True else 0
    robbery_total = int(data[6]) if helper.isInteger(data[6]) is True else 0
    aggravated_assault_total = int(data[7]) if helper.isInteger(data[7]) is True else 0
    violent_crime_rate = float(data[8]) if helper.isFloat(data[8]) is True else 0.0
    murder_and_nonnegligent_manslaughter_rate = float(data[9]) if helper.isFloat(data[9]) is True else 0.0
    legacy_rape_rate = float(data[10]) if helper.isFloat(data[10]) is True else 0.0
    revised_rape_rate = float(data[11]) if helper.isFloat(data[11]) is True else 0.0
    robbery_rate = float(data[12]) if helper.isFloat(data[12]) is True else 0.0
    aggravated_assault_rate = float(data[13]) if helper.isFloat(data[13]) is True else 0.0

    '''if year is None: print("year: ", year)
    if stateName is None:  print("stateName: ", stateName)
    if population is None:  print("population: ", population)
    if violent_crime_total is None:  print("violent_crime_total: ", violent_crime_total)
    if murder_and_nonnegligent_manslaughter_total is None: print("murder_and_nonnegligent_manslaughter_total: ", murder_and_nonnegligent_manslaughter_total)
    if legacy_rape_total is None:  print("legacy_rape_total: ", legacy_rape_total)
    if revised_rape_total is None:  print("revised_rape_total: ", revised_rape_total)
    if robbery_total is None:  print("robbery_total: ", robbery_total)
    if aggravated_assault_total is None:  print("aggravated_assault_total: ", aggravated_assault_total)
    if violent_crime_rate is None:  print("violent_crime_rate: ", violent_crime_rate)
    if murder_and_nonnegligent_manslaughter_rate is None:  print("murder_and_nonnegligent_manslaughter_rate: ", murder_and_nonnegligent_manslaughter_rate)
    if legacy_rape_rate is None:  print("legacy_rape_rate: ", legacy_rape_rate)
    if revised_rape_rate is None:  print("revised_rape_rate: ", revised_rape_rate)
    if robbery_rate is None:  print("robbery_rate: ", robbery_rate)
    if aggravated_assault_rate is None: print("aggravated_assault_rate: ", aggravated_assault_rate)'''


    if not Crime.objects(year=year, state=stateName, population=population, violent_crime_total=violent_crime_total, 
    murder_and_nonnegligent_manslaughter_total=murder_and_nonnegligent_manslaughter_total, legacy_rape_total=legacy_rape_total, 
    revised_rape_total=revised_rape_total, robbery_total=robbery_total, aggravated_assault_total=aggravated_assault_total, violent_crime_rate=violent_crime_rate, 
    murder_and_nonnegligent_manslaughter_rate=murder_and_nonnegligent_manslaughter_rate, legacy_rape_rate=legacy_rape_rate, 
    revised_rape_rate=revised_rape_rate, robbery_rate=robbery_rate, 
    aggravated_assault_rate=aggravated_assault_rate):
        crime = Crime(year=year, state=stateName, population=population, violent_crime_total=violent_crime_total, 
    murder_and_nonnegligent_manslaughter_total=murder_and_nonnegligent_manslaughter_total, legacy_rape_total=legacy_rape_total, 
    revised_rape_total=revised_rape_total, robbery_total=robbery_total, aggravated_assault_total=aggravated_assault_total, violent_crime_rate=violent_crime_rate, 
    murder_and_nonnegligent_manslaughter_rate=murder_and_nonnegligent_manslaughter_rate, legacy_rape_rate=legacy_rape_rate, 
    revised_rape_rate=revised_rape_rate, robbery_rate=robbery_rate, 
    aggravated_assault_rate=aggravated_assault_rate)
        crime.save()
        return data


def insertNewLegalStatusDocument(data):
    state = data[0].strip()
    date = data[1].strip()
    status = data[2].strip()

    legal = Legal() 

    if not Legal.objects(state=state, date=date, status=status): 
        legal = Legal(state=state, date=date, status=status)
        legal.save() 
        return data

def insertNewInnocenceDocument(data):
    innocence_number = int(data[0].strip()) if helper.isInteger(data[0].strip()) is True else 0
    name = data[1].strip()
    state = data[2].strip()
    race = data[3].strip()
    convicted = int(data[4].strip()) if helper.isInteger(data[4].strip()) is True else 0
    exonerated = int(data[5].strip()) if helper.isInteger(data[5].strip()) is True else 0
    years_between = int(data[6].strip()) if helper.isInteger(data[6].strip()) is True else 0
    exoneration_procedure = data[7].strip()
    reasons = [x.strip() for x in data[8].split(',')]
    dna = True if data[9].strip() == 'Yes' else False 

    innocence = Innocence()

    if not Innocence.objects(innocence_number=innocence_number, name=name, state=state, race=race, convicted=convicted, exonerated=exonerated,
     years_between=years_between, exoneration_procedure=exoneration_procedure, reasons=reasons, dna=dna):

     innocence = Innocence(innocence_number=innocence_number, name=name, state=state, race=race, convicted=convicted, exonerated=exonerated,
     years_between=years_between, exoneration_procedure=exoneration_procedure, reasons=reasons, dna=dna)
     innocence.save()
     return data

def insertNewDeathRowDocument(data, state, total, date, headers):
    lookupState = ''
 
    if(state in constants.STATES):
        #lookupState = constants.STATECODEPAIRS.get(state)
        lookupState = state
    elif(state in constants.STATECODES):
        lookupState = list(constants.STATECODEPAIRS.keys())[list(constants.STATECODEPAIRS.values()).index(state)]

    deathRow = DeathRow()

    if not DeathRow.objects(state=lookupState, date=date, total=total, races=data):
        deathRow = DeathRow(state=lookupState, date=date, total=total, races=data)
        deathRow.save()
        return data, state, total, date


def insertNewExecutionDocument(data):
    print(data)
    execution_number = int(data[0].strip()) if helper.isInteger(data[0].strip()) is True else 0
    execution_date = data[1].strip()
    first_name = data[2].strip()
    last_name = data[3].strip()
    middle_name = data[4].strip()
    age_at_execution = data[5].strip()
    race = data[7].strip()
    gender = data[8].strip()
    region = data[9].strip()
    state = data[10].strip()
    county = data[11].strip()
    foreign_national = data[12].strip()
    execution_method = data[13].strip()
    execution_volunteer = data[14].strip()
    number_of_victims = int(data[15].strip()) if helper.isInteger(data[15].strip()) is True else 0
    number_of_white_male_victims = int(data[16].strip()) if helper.isInteger(data[16].strip()) is True else 0
    number_of_black_male_victims = int(data[17].strip()) if helper.isInteger(data[17].strip()) is True else 0
    number_of_latino_male_victims = int(data[18].strip()) if helper.isInteger(data[18].strip()) is True else 0
    number_of_asian_male_victims = int(data[19].strip()) if helper.isInteger(data[19].strip()) is True else 0
    number_of_native_american_male_victims = int(data[20].strip()) if helper.isInteger(data[20].strip()) is True else 0
    number_of_other_race_male_victims = int(data[21].strip()) if helper.isInteger(data[21].strip()) is True else 0
    number_of_white_female_victims = int(data[22].strip()) if helper.isInteger(data[22].strip()) is True else 0
    number_of_black_female_victims = int(data[23].strip()) if helper.isInteger(data[23].strip()) is True else 0
    number_of_latino_female_victims = int(data[24].strip()) if helper.isInteger(data[24].strip()) is True else 0
    number_of_asian_female_victims = int(data[25].strip()) if helper.isInteger(data[25].strip()) is True else 0
    number_of_native_american_female_victims = int(data[26].strip()) if helper.isInteger(data[26].strip()) is True else 0
    number_of_other_race_female_victims = int(data[27].strip()) if helper.isInteger(data[27].strip()) is True else 0

    execution = Execution() 

    if not Execution.objects(execution_number=execution_number, execution_date=execution_date, first_name=first_name, 
    last_name=last_name, middle_name=middle_name, age_at_execution=age_at_execution, race=race, gender=gender, 
    region=region, state=state, county=county, foreign_national=foreign_national, execution_method=execution_method,
    execution_volunteer=execution_volunteer, number_of_victims=number_of_victims, number_of_white_male_victims=number_of_white_male_victims,
    number_of_black_male_victims=number_of_black_male_victims, number_of_latino_male_victims=number_of_latino_male_victims, 
    number_of_asian_male_victims=number_of_asian_male_victims, number_of_native_american_male_victims=number_of_native_american_male_victims,
    number_of_other_race_male_victims=number_of_other_race_male_victims, number_of_white_female_victims=number_of_white_female_victims,
     number_of_black_female_victims=number_of_black_female_victims, number_of_latino_female_victims=number_of_latino_female_victims,
     number_of_asian_female_victims=number_of_asian_female_victims,number_of_native_american_female_victims=number_of_native_american_female_victims,
     number_of_other_race_female_victims=number_of_other_race_female_victims ):



        execution = Execution(execution_number=execution_number, execution_date=execution_date, first_name=first_name, 
    last_name=last_name, middle_name=middle_name, age_at_execution=age_at_execution, race=race, gender=gender, 
    region=region, state=state, county=county, foreign_national=foreign_national, execution_method=execution_method,
    execution_volunteer=execution_volunteer, number_of_victims=number_of_victims, number_of_white_male_victims=number_of_white_male_victims,
    number_of_black_male_victims=number_of_black_male_victims, number_of_latino_male_victims=number_of_latino_male_victims, 
    number_of_asian_male_victims=number_of_asian_male_victims, number_of_native_american_male_victims=number_of_native_american_male_victims,
    number_of_other_race_male_victims=number_of_other_race_male_victims, number_of_white_female_victims=number_of_white_female_victims,
     number_of_black_female_victims=number_of_black_female_victims, number_of_latino_female_victims=number_of_latino_female_victims,
     number_of_asian_female_victims=number_of_asian_female_victims,number_of_native_american_female_victims=number_of_native_american_female_victims,
     number_of_other_race_female_victims=number_of_other_race_female_victims )  
        execution.save() 
        return data

def insertNewOpinionDocument(year, murderOpinionObject, moralOpinionObject, frequencyOpinionObject, equitableOpinionObject, approachOpinionObject):
    opinion = Opinion() 
    if not Opinion.objects(year=year, murder=murderOpinionObject, moral=moralOpinionObject, frequency=frequencyOpinionObject, equitable=equitableOpinionObject, approach=approachOpinionObject):
        opinion = Opinion(year=year, murder=murderOpinionObject, moral=moralOpinionObject, frequency=frequencyOpinionObject, equitable=equitableOpinionObject, approach=approachOpinionObject) 
        opinion.save() 
        return year, murderOpinionObject, moralOpinionObject, frequencyOpinionObject, equitableOpinionObject, approachOpinionObject


@app.route('/loadData', methods=['GET']) 
def loadData():
    result = []
    for root, directories, filenames in os.walk('my_app/data'):
        for filename in filenames: 
            #print("Filename: ", filename)
            path = os.path.join(root,filename)
            f = open(path)
            #print("Path: ", path)
            r = csv.reader(f)

            d = list(r)
            header = d[0] # retrives the header and places it in a specific variable as d[0] will get deleted later to make way for easier reading
        
            if('crime_rates' in path):
                # For these particular dataset, each state's name is known simply by the filename, i.e. 'delaware.csv'
                # Inside the CSV file, there is no field to describe the states name, i.e. 'Delaware', so therefore it
                # is simply identified by the filename. Introducing a new header to simply describe it again seems unnecessary
                # I need to do some string functions to extract the raw state name from the path
                # The raw path (e.g. the 'path' variable) appears like this: data\crime_rates\delaware.csv

                # I must firstly remove the leading blackslash which gets me 'delaware.csv'
                pathWithoutBackslashes = path.rsplit('\\', 1)[-1]
                # for states with double words, i.e. 'West Virginia', they appear in the format 'west-virginia'. 
                # I must remove the unnecessary dash otherwise it will not match in the array of states
                pathWithoutDashes = pathWithoutBackslashes.replace('-', ' ') 

                # This removes the unnecssary '.csv ' extension tacked on at the end (and any other extensions for the the record, but that does not 
                # matter in our case every file we are working with is .csv
                # again, as there are states with two words, I cannot use .upper() because that only capitalises the first word
                formattedState = os.path.splitext(pathWithoutDashes.title())[0] 

                # The final result from the above functions should be 'Delaware', 'South Dakota', 'Oregon' now etc
                
                del d[0] # Deletes the header row

                if(formattedState in constants.STATES):
                    for data in d:
                        rawResult = insertNewCrimeDocument(data, formattedState)
                
                        # this checks both if the literal value equals 'None' and also the class type is 'NoneType'
                        # I probably only need to helper one of them and am being overly comprehensive
                        # If this does not happen, the 'rawResult' which is None will be converted into a null, therefore you get useless output like
                        # [null, null, null, null, null, null, null, null, null, null, null ...]

                        if rawResult is not None or not isinstance(rawResult, type(None)): result.append(rawResult) 
                else:
                    # This is a fallback just in case the state name cannot be found for whatever reason (from an observational viewpoint, this shouldn't happen)
                    # as long as the state names are the same as they are
                    # The diff lib's 'get_close_matches' function does exactly as it says on the tin. Pass in the formattedPath variable which has been deemed by
                    # the previous conditional statement to not match any state in the STATES array and simply helper if it is close to any of them
                    CONST = _Const()

                    rawSimilarState = difflib.get_close_matches(formattedState, STATES, n=1)

                     # If one has been found, use that state name and continue with inserting the Crime object
                    if(len(rawSimilarState) > 0):
                        similarState = rawSimilarState[0]
                        
                        print("Formatted state: ", formattedState)
                        print("Similar state: ", similarState)

                        # This produces a confidence score, based on the similarity ratio of the formatted state that cannot be accurately matched
                        # along with a state the 'get_close_matches' function has outputted as a possibility
                        confidenceScore = round(difflib.SequenceMatcher(None, formattedState, similarState).ratio(), 2)
                        print("Confidence score: ", confidenceScore)

                        # The confidence rate can be changed. The official definition of a 'close match' according to the difflib documentation is 0.6
                        # I decided to be a little more cautious and go for 0.75
                        # See https://docs.python.org/2/library/difflib.html#sequencematcher-examples for the source of the official definition
                        if confidenceScore > CONST.CONFIDENCE_SCORE:
                            for data in d:
                                rawResult = insertNewCrimeDocument(data, similarState[0])
                    
                                # this checks both if the literal value equals 'None' and also the class type is 'NoneType'
                                # I probably only need to helper one of them and am being overly comprehensive
                                # If this does not happen, the 'rawResult' which is None will be converted into a null, therefore you get useless output like
                                # [null, null, null, null, null, null, null, null, null, null, null ...]

                                if rawResult is not None or not isinstance(rawResult, type(None)): result.append(rawResult) 
                        else:
                            print(f"We could not insert a particular new Crime document. The raw input was {path} and the formatted path was {formattedState}. "\
                                    f"As '{formattedState}' does not match any state directly, the program attempted to find something similar related to this. "\
                                    f"It came up with '{similarState}' as to what it could find. "\
                                    f"The confidence score was {confidenceScore}%. The required confidence score to pass is {CONST.CONFIDENCE_SCORE:,.2f}%.") 
                        # If not confident enough (i.e. simply no results returned) then leave the Crime object insertion alone and return a message to the user
                        # with both the raw input and formatted input that cannot be confidently matched to a state
                    else:
                         print(f"We could not insert a particular new Crime document. The raw input was {path} and the formatted path was {formattedState}. "\
                                f"As '{formattedState}' does not match any state directly, the program attempted to find something similar related to this. "\
                                f"Unfortunately, it was not able to find any significant match at all. Please helper to confirm that your {formattedState} "\
                                f"matches a state name of the USA, i.e. New York. Note that the program should be able to find small typographical errors such "\
                                f"as 'New Yorkk', but it is preferable that you specify the proper name. Specifying shortened state names such as 'Dakota' will be "\
                                f"dubious at best, and you may end up with South Dakota or North Dakota in such instances.")

        
            if('death_row' in path):
                    deathRowBuilder = []
                    dictBuilder = {}
                    # retrieves the year immediately before the last backslash. i.e. if the path is 'my_app/data\death_row/2001/fall.csv, 2001 will be returned
                    year = int(path.split('\\')[-2] )
                    rawFileName = path.rsplit('\\', 1)[-1]
                    fileName = os.path.splitext(rawFileName.lower())[0] 

                    date = ''
                    print(fileName)

                    if (fileName in ['winter', 'spring', 'summer', 'fall']):
                        # This is essentially a lookup table. The reports for death row information are always produced on the first beginning month of their corresponding season for 2000 onwards
                        #lookupDateReportTable = {'winter': f'1/1/{year}', 'spring': f'4/1/{year}', 'summer': f'7/1/{year}', 'fall': f'10/1/{year}'}
                        lookupDateReportTable = {'winter': dt.date(year, 1, 1), 'spring': dt.date(year, 4, 1), 'summer': dt.date(year, 7, 1), 'fall': dt.date(year, 10, 1)}
                        date = lookupDateReportTable.get(fileName) 
                    else:
                        date = fileName.replace('-', '/')

                    headers = d[0]
                    del d[0]
                    total = 0
                    totalIndex = headers.index('total')
                    state = ''
                    stateIndex = headers.index('state')
                    
                    headers.pop(totalIndex)
                    headers.pop(stateIndex)
                    for outerData in d:
                        total = outerData[totalIndex].strip()
                        state = outerData[stateIndex].strip()
                        outerData.pop(totalIndex)
                        outerData.pop(stateIndex)

                        for innerIndex, innerData in enumerate(outerData):
                            dictBuilder[headers[innerIndex]] = int(innerData.strip())


                        rawResult = insertNewDeathRowDocument(dictBuilder, state, total, date, headers)
                        if rawResult is not None or not isinstance(rawResult, type(None)): result.append(rawResult)

            if('sentencing-rates-detailed.csv' in path):    
                del(d[0][0])
                years = d[0]
                del d[0]
                for dataIndex, data in enumerate(d):
                    if(data[0] not in ['NORTHEAST', 'MIDWEST', 'SOUTH', 'WEST', 'TOTAL'] and len(data[0]) > 0):
                    
                        # Finds associated state name using its state code (data[0] will be FL, TX etc))
                        # Therefore, mapping FL to 'Florida', TX to 'Texas' etc
                        if(data[0] in constants.STATECODES):
                            state = list(constants.STATECODEPAIRS.keys())[list(constants.STATECODEPAIRS.values()).index(data[0])]
                        else:
                             state = list(constants.STATECODEPAIRS.keys())[list(constants.STATECODEPAIRS.values()).index(data[0].title())]
                        # This creates a data dictionary, that will eventually get parsed by MongoEngine through its ListField data type,
                        # which eventually gets created as an array of objects with key-value pairs
                        # A shortened example of a constructed Object which will get created from this builder is
                        # [{'year': 2018, 'sentence': 0}, {'year': 2017, 'sentence': 0}, {'year': 2016, 'sentence': 0}, ...]
    
                        builder = []

                        for sentencingIndex, sentence in enumerate(data[1:]):
                            builder.append({'year': int(years[sentencingIndex].strip()), 'sentence': int(sentence.strip())})

                        if not Sentencing.objects(state=state):          
                            sentencing = Sentencing()
                            result.append(data)

                            sentencing = Sentencing(state=state, years=builder)
                            sentencing.save()

            if('opinion-summary.csv' in path):
                del d[0]

                murderOpinionBuilder = []
                moralOpinionBuilder = []
                frequencyOpinionBuilder = []
                equitableOpinionBuilder = []
                approachOpinionBuilder = []
                years = list(range(1937, 2020))

                # builds the individual opinion array of objects
                for index, data in enumerate(d):
                    if(len(data[0].strip()) > 0 and len(data[1].strip()) > 0 and len(data[2].strip()) > 0 and len(data[3].strip()) > 0 and len(data[4].strip()) > 0 ):
                        murderOpinionBuilder.append({'from_date': data[0].strip(), 'to_date': data[1].strip(), 'favour': int(data[2].strip()), 'disfavour': int(data[3].strip()), 'neutral': int(data[4].strip())})
                    if(len(data[5].strip()) > 0 and len(data[6].strip()) > 0 and len(data[7].strip()) > 0 and len(data[8].strip()) > 0 and len(data[9].strip()) > 0 and len(data[10].strip()) > 0 ):
                        moralOpinionBuilder.append({'from_date': data[5].strip(), 'to_date': data[6].strip(), 'acceptable': int(data[7].strip()), 'wrong': int(data[8].strip()), 'depends': int(data[9].strip()), 'no_opinion': int(data[10].strip())})
                    if(len(data[11].strip()) > 0 and len(data[12].strip()) > 0 and len(data[13].strip()) > 0 and len(data[14].strip()) > 0 ):
                        frequencyOpinionBuilder.append({'from_date': data[11].strip(), 'to_date': data[12].strip(), 'too_often': int(data[13].strip()), 'right_amount': int(data[14].strip()), 'not_enough': int(data[15].strip()), 'no_opinion': int(data[16].strip())})
                    if(len(data[17].strip()) > 0 and len(data[18].strip()) > 0 and len(data[18].strip()) > 0 and len(data[19].strip()) > 0 and len(data[20].strip()) > 0 and len(data[21].strip()) > 0 ):
                        equitableOpinionBuilder.append({'from_date': data[17].strip(), 'to_date': data[18].strip(), 'fairly': int(data[19].strip()), 'unfairly': int(data[20].strip()), 'no_opinion': int(data[21].strip())})
                    if(len(data[22].strip()) > 0 and len(data[23].strip()) > 0 and len(data[24].strip()) > 0 and len(data[25].strip()) > 0 and len(data[26].strip()) > 0):
                        approachOpinionBuilder.append({'from_date': data[22].strip(), 'to_date': data[23].strip(), 'death_penalty': int(data[24].strip()), 'life_imprisonment': int(data[25].strip()), 'no_opinion': int(data[26].strip())})

                # appends the builder object to the official result only if the year matches
                for year in years:
                    murderOpinionResult = [element for element in murderOpinionBuilder if datetime.strptime(element['from_date'], "%d/%m/%Y").year == year]
                    moralOpinionResult = [element for element in moralOpinionBuilder if datetime.strptime(element['from_date'], "%d/%m/%Y").year == year]
                    frequencyOpinionResult = [element for element in frequencyOpinionBuilder if datetime.strptime(element['from_date'], "%d/%m/%Y").year == year]
                    equitableOpinionResult = [element for element in equitableOpinionBuilder if datetime.strptime(element['from_date'], "%d/%m/%Y").year == year]
                    approachOpinionResult = [element for element in approachOpinionBuilder if datetime.strptime(element['from_date'], "%d/%m/%Y").year == year]

                    rawResult = insertNewOpinionDocument(year, murderOpinionResult, moralOpinionResult, frequencyOpinionResult, equitableOpinionResult, approachOpinionResult)
                    if rawResult is not None or not isinstance(rawResult, type(None)): result.append(rawResult)

            if('DPIC Execution Database - U.S. Executions.csv' in path):
                del d[0]
                for data in d:
                    rawResult = insertNewExecutionDocument(data)
                    if rawResult is not None or not isinstance(rawResult, type(None)): result.append(rawResult)

            if('legal.csv' in path):
                del d[0]
                for data in d:
                    rawResult = insertNewLegalStatusDocument(data)
                    if rawResult is not None or not isinstance(rawResult, type(None)): result.append(rawResult)    

            if('innocence.csv' in path):
                del d[0]
                for data in d:
                    rawResult = insertNewInnocenceDocument(data)
                    if rawResult is not None or not isinstance(rawResult, type(None)): result.append(rawResult)         
    
    # returns a (reasonably) nicely formatted dump output once the file reading is completed
    return json.dumps(result, indent=10, sort_keys=True, separators=(',', ': '),  default=str)