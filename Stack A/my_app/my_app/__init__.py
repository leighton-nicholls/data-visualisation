from flask import Flask
from os import walk
import os

app = Flask(__name__, template_folder='templates', static_url_path='/static')

    
#app.config.from_object('config')




# http://bl.ocks.org/diggetybo/raw/77469aa2acec38f1870197724ea671d6/
# https://bl.ocks.org/jadiehm/8f5adc05465a94e77e30

##### ALL aggregation queries return a CommandCursor object
##### To get rid of the (usually) unnecessary '_id' that gets returned, one could either use
##### $unset or $project. Alternatively, remove it from the output by using "document.pop('_id')"


import my_app.views.crime.deletion
import my_app.views.crime.insertion
import my_app.views.crime.selection
import my_app.views.crime.update
import my_app.views.executions.deletion
import my_app.views.executions.insertion
import my_app.views.executions.slider
import my_app.views.executions.update
import my_app.views.executions.overview
import my_app.views.executions.running
import my_app.views.executions.selections.nonPosteriously.federal
import my_app.views.executions.selections.nonPosteriously.military
import my_app.views.executions.selections.nonPosteriously.state
import my_app.views.executions.selections.posteriously.federal
import my_app.views.executions.selections.posteriously.military
import my_app.views.executions.selections.posteriously.state
import my_app.views.opinion.deletion
import my_app.views.opinion.insertion
import my_app.views.opinion.selection
import my_app.views.opinion.update
import my_app.views.sentences.deletion
import my_app.views.sentences.insertion
import my_app.views.sentences.overview
import my_app.views.sentences.selections.federal
import my_app.views.sentences.selections.military
import my_app.views.sentences.selections.state
import my_app.views.sentences.update
import my_app.views.site.home
import my_app.views.site.inspiration
import my_app.views.site.loadData


import my_app.views.legal.deletion
import my_app.views.legal.insertion
import my_app.views.legal.selection
import my_app.views.legal.update
import my_app.views.legal.count


import my_app.views.executions.selection
import my_app.views.sentences.selection



import my_app.views.innocence.selection
import my_app.views.innocence.insertion
import my_app.views.innocence.deletion
import my_app.views.innocence.update

import my_app.views.death_row.selection
import my_app.views.death_row.insertion
import my_app.views.death_row.deletion
import my_app.views.death_row.update

import my_app.views.opinion.murder.selection
import my_app.views.opinion.moral.selection
import my_app.views.opinion.frequency.selection
import my_app.views.opinion.equitable.selection
import my_app.views.opinion.approach.selection





