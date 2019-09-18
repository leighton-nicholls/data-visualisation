from flask import Flask, request, render_template
from mongodb import Opinion, Execution, Crime, Legal
import os, csv, json
#from mongoengine import *
#connect('web3')
app = Flask(__name__, template_folder='templates', static_url_path='/static')
app.config.from_object('config')

# http://bl.ocks.org/diggetybo/raw/77469aa2acec38f1870197724ea671d6/
# https://bl.ocks.org/jadiehm/8f5adc05465a94e77e30

'''def switch_csv(argument):
    switcher = {
        1: "",
        2: "",
        3: "",
        4: ""
    }

    print switcher.get(argument, 'INVALID CSV!')'''
    
@app.route('/') 
@app.route('/index') 
@app.route('/home') 
def index():
    return render_template('index.html')

@app.route('/inspiration') 
def inspiration():
    return render_template('inspiration.html')

@app.route('/testmap') 
def testmap():
    return render_template('testmap.html')

@app.route('/loadData', methods=['GET']) 
def loadData():
    for file in os.listdir(app.config['FILES_FOLDER']):
        filename = os.fsdecode(file)
        path = os.path.join(app.config['FILES_FOLDER'],filename)
        print("Path: ", path)
        f = open(path)
        r = csv.reader(f)
        d = list(r)
        header = d[0]
        del d[0]
        
        for data in d:
            if('opinion-rates.csv' in path):
                opinion = Opinion() 
                dict = {} # a blank placeholder data dict
                print("Opinion: ", data)
                if not Opinion.objects(year=data[0], favour=data[1], disfavour=data[2], neutral=data[3]):
                    opinion = Opinion(year=data[0], favour=data[1], disfavour=data[2], neutral=data[3])  
                    opinion.save() 
            if('DPIC Execution Database - U.S. Executions.csv' in path):
                execution = Execution() 
                dict = {} # a blank placeholder data dict
                #print("Execution: ", data)
                if not Execution.objects(execution_number=data[0], execution_date=data[1], first_name=data[2], last_name=data[3], middle_name=data[4], race=data[6], gender=data[7], region=data[8], state=data[9], execution_method=data[12]):
                    opinion = Execution(execution_number=data[0], execution_date=data[1], first_name=data[2], last_name=data[3], middle_name=data[4], race=data[6], gender=data[7], region=data[8], state=data[9], execution_method=data[12])  
                    opinion.save() 
                


        return json.dumps(d, indent=10, sort_keys=True, separators=(',', ': '))



if __name__ =="__main__":
    app.run(debug=True, port=8080)
