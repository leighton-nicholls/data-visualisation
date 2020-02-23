# Introduction

This application covers aspects of capital punishment in the United States in the modern-era (i.e. since the U.S. Supreme Court reaffirmed the legality of capital punishment in the 1976 case Gregg v. Georgia). In Stack A is a choropleth map that demonstrates execution, sentencing, legal status and death row trends over time.

Stack B covers most of what Stack A covers but in more detail, and the interface provides more opportunity for varied usage of graphs. 


# Stack A

Requirements:

Flask installed (`pip install Flask` after downloading any latest version of Python from https://www.python.org/downloads)

marshmallow_mongoengine (ver. `2.19.2`): `pip install marshmallow_mongoengine`
marshmallow (ver. `2.19.2`): `pip install marshmallow`
flask_mongoengine: `pip install flask_mongoengine`
python-dateutil `pip install python-dateutil`

Mongo - install from https://www.mongodb.com/download-center/community. You **must** also install the `mongod` process when it asks you during the installation. Feel free to download MongoDB Compass as well if you want to see the documents in style (a nice GUI).

Optional: install MongoDB Compass from https://www.mongodb.com/download-center/compass to view the documents in style. This program should install when you install MongoDB above, as long as you keep the checkbox ticked.

If you receive an error message such as `pymongo.errors.ServerSelectionTimeoutError: localhost:27017: [WinError 10061] No connection could be made because the target machine actively refused it`, then there is likely something wrong with your mongo setup.

**APIs**

Postman: I recommend using Postman to utilise the APIs. For GET requests, you can go directly in your browser to the URL, i.e. `http://localhost:5000/getAllMurderOpinionDocumentsByYear/2018`. For more requests though by state and year, I prefer to use Postman.

See the associated example images in the /static/images/instructions folder of Stack A for more examples/details on API usage.



## Starting the mongodb server

To connect to MongoDB database, you must have MongoEngine installed. Use `pip install mongoengine`. Once MongoEngine is installed, open up a cmd and run `mongod`. You should receive a bunch of output, with a message similar to `2019-09-17T07:46:06.639+1200 I  CONTROL  [initandlisten] MongoDB starting : pid=17672 port=27017 dbpath=C:\data\db\ 64-bit host=D206-66735`. Note that you must create a directory under the C:\ directory, i.e. `C:\data\db`. Otherwise, running `mongod` returns an error saying `NonExistentPath: Data directory C:\data\db not found., terminating`. **mongod** does not create this folder automatically for you, you MUST create the folder yourself.

Once the `mongod` service is running, minimise the cmd window (don't close it) and leave it running. Open up another cmd process and execute the command `mongo`. The Mongo shell should open up and you can now run Mongo commands. For example, `show dbs`, `use web3`, `show collections` etc. Make sure to keep the other `mongod` process running at all times in the background.

To view the data in a GUI version, download MongoDB Compass. Connect to `localhost` with port number `27017`. This is the same as the method above, although this is the graphical version. You don't need mongod running at the same time.

To call an API, simply go to `127.0.0.1:8080/<api name here>` (or whichever port flaskr opened with) and the results will be returned. For example, `127.0.0.1:8080/getAllSentencingRates`. For API routes with parameters, singular ones can be called with a forward slash like `127.0.0.1:8080/getAllSentencingRatesByYear/<input here>`, i.e. `127.0.0.1:8080/getAllSentencingRates/2014`. For routes with multiple parameters, call the route with specified parameter and variable names separated by ampersands; `127.0.0.1:8080/getAllSentencingRates?state=<state name here>&year=<year here>`, i.e. `http://127.0.0.1:8080/getSentencingRateByStateByYear?state=Delaware&year=2017`.

Note that I made the application more modular, particularly in the `views` area, by following this guide: https://flask.palletsprojects.com/en/1.1.x/patterns/packages/

This means that we are now using the command line. To export it you need to run the following command `export FLASK_APP=my_app` from the `/my_app/my_app` directory level.

To run the application, type `flask run` from the `/my_app` directory level. To run the app from localhost; `flask run -h localhost -p 3000`. This will change it from `http:127.0.0.1:3000` to `http://localhost:3000/` To run the app from a specific port; `flask run -p 3000`. Note that you can combine the usage of different options at the same time, i.e. `flask run -h localhost -p 3000`.


To run the app in development mode; `export FLASK_ENV=development`. To run the app in debug mode; `export FLASK_DEBUG=1`. The first one will run it in debug regardless. Running it in development mode means the server will find your saved changes every time you save, unlike the production environment. When you make a change in the production environment, any changes you make will not be recognised until you stop and restart the server. You will receive a `WARNING: This is a development server. Do not use it in a production deployment.` message. This is also the same behaviour for when `DEBUG` is set to be true (1). **However,** both the environment must be set to `development` **and** `DEBUG` be set to true (1) in order for the feature to work. You can switch back to the production environment by `export FLASK_ENV=production`, or to no debugging with `export FLASK_DEBUG=0`.

**Note:** For the marshmallow_mongoengine package, I have installed the latest version simply by using `pip install marshmallow_mongoengine` - this installs the `six`, `marshmallow` and `marshmallow_mongoengine` packages. However, the `marshmallow`'s package version appears to be currently incompatible as of 10th October 2019. Returns an error of `` See this [issue](https://github.com/touilleMan/marshmallow-mongoengine/issues/26) and this [issue](https://github.com/fuhrysteve/marshmallow-jsonschema/issues/69) on GitHub. My workaround is after installing `marshmallow_mongoengine`, uninstall `marshmallow` with simply `pip uninstall marshmallow`. Then use `pip install marshmallow==2.19.2` to specifically install the `2.19.2` version.

If this does not work for you on your machine, try playing around with installing different versions of `marshmallow`. You can use the pip command `pip install marshmallow==`, which dumps an output of the different version numbers.

**MongoEngine note**: sometimes, when inserting a new document into the database, the map does not reflect this change right away. For example, when inserting a legal update via the `/http://127.0.0.1:5000/insertNewLegalStatusDocument` API route, and inserting the field value pairs of `date: 2019`, `state: Texas`, `status: Abolished`, when refreshing the map it may still list Texas as a retentionist state. The reason for this is because MongoEngine/MongoDB cache the records locally. This usually dissipates by itself after a certain time, but one can clear the `PlanCache`'s clear function property of the database collection. Occasionally, hard refreshing the page using CTRL+F5 works too.

Things to fix:

When changing to a different port number, it does not allow the API GET requests? i.e. `flask run -h localhost -p 3000` and going to http://localhost:8080/getTotalExecutionsOverall does not return anything. PATCH/PUT requests still seem to work. Perhaps I am typing address incorrectly

Once I have had the `http://127.0.0.1:5000/` address not load anything. Can't reproduce it though. 

Problems with script tags? Seems to happen 1/50 chance on load. Not sure why

# Stack B

## Requirements


Due to issues with the `react-d3-components` package not being very willing to accept d3 packages (based on my personal experience) higher than version 3.6, I decided to create an alias to use the latest version (d3 version 5, at time of writing) in the `package.json`: `"d3v5": "npm:d3@^5.13.1"`. This requires a reasonably latest version of `npm`, otherwise it throws a `npm ERR! Invalid dependency type requested: alias` error. Check your version with `npm -v`; I have managed to get it working with npm version `6.13.0`. The officially supported starting version is `6.9.0` (https://npm.community/t/release-npm-6-9-0/5911).

If you have too low of a version installed, you'll see an error like `Unsupported URL Type: npm:d3@^5.13.1`

To start the server, navigate to the `/my-app` directory level and type `npm start`. The application will serve on `localhost:3000`. Note that if you have a SSL certificate specified in another project for this particular port (or whichever port Stack B is served on), then you may end up with somewhat obscure (but logical) errors given by the browser, such as "An error occurred during a connection to localhost:3000. SSL received a record that exceeded the maximum permissible length. Error code: SSL_ERROR_RX_RECORD_TOO_LONG" in Firefox and "This site can’t provide a secure connectionlocalhost sent an invalid response. ERR_SSL_PROTOCOL_ERROR" in Chrome. This simply means your certificate is conflicting with the app, since it has not been configured. The simple solution for this is to run it on a different port other than the default `3000`. You can specify this in the `.env` file which port you'd like the app to run on. 

Run an `npm install`


  // https://deliciousbrains.com/npm-build-script/

# Sources

## Executions

taken from https://deathpenaltyinfo.org/executions/execution-database via the downloadable CSV file at https://docs.google.com/spreadsheets/d/e/2PACX-1vQDMoiJXVldahXzL4S037MGb7DgZMfeqfrR-zYtDJ_U-Sd6FS35W7WU_6N8pXBOm9NOBGIM8BEui37x/pub?gid=0&single=true&output=csv. 

Note: the CSV file does not contain the age when the convict was executed, unlike the online version. I took the liberty of traversing the online one for the ages and adding them manually to the CSV file.

Note: the number of victims listed in the csv file is not always correct. For example, serial killer Theodore Bundy (line #106 in file) is listed as having a total number of confirmed victims as 1. However, Theodore confessed to at least 30 victims (https://en.wikipedia.org/wiki/Ted_Bundy). I decided to change this to a total of 30 victims manually, though I changed the number of white female victims to 0 as a portion of the true number of his confirmed victims is unidentified. Therefore, some integrity between the csv file and the live execution database has been lost. However, not doing so would cause inaccuracy in the victim breakdown graphs.

Posterior executions (i.e. executions that are scheduled to take place later in the year or in future year(s)) are retrieved from https://en.wikipedia.org/wiki/List_of_offenders_scheduled_to_be_executed_in_the_United_States

## Crime

Crime rates by state: https://www.ucrdatatool.gov/. 
N.B. All states have data from 1960 onwards apart from New York, which has data starting from 1965. This explains the five less
documents that will appear in the database. Calculating 50 (states) x 55 (typical number of rows in a states CSV file) = 2750, however
MongoDB will show a count of 2745 document records, which is expected per the New York anomaly.

http://www.disastercenter.com/crime
https://www.fbi.gov/services/cjis/ucr#All-Publications
https://ucr.fbi.gov/crime-in-the-u.s/2018/crime-in-the-u.s.-2018/topic-pages/offenses-known-to-law-enforcement

## Death sentences

https://deathpenaltyinfo.org/facts-and-research/sentencing-data/death-sentences-in-the-united-states-from-1977-by-state-and-by-year

## Images


Flags: https://usa.flagpedia.net/download (small and normal res packages). USA flag retrieved from https://flagpedia.net/the-united-states. Military flag retrieved from: https://en.wikipedia.org/wiki/United_States_Armed_Forces

Execution icons: 
https://thenounproject.com

noun_Electric Chair_977788.svg
noun_firing squad_1938827.svg
noun_Gas Mask_501690.svg
noun_hanging_1938834.svg: https://thenounproject.com/search/?q=hanging&i=1938834
noun_Lethal Injection_2389843.svg

## Death row

Sources from 2000 - 2019: https://www.naacpldf.org/our-thinking/death-row-usa/. 

Sources from 1976 - 1999 (note exceptions below): https://www.bjs.gov/index.cfm?ty=pbdc&dcid=253&iid=1. I manually combed through the various files on there. Some publications were missing (due to paper-copy only), but most of the time I was able to extract the data from a report a year ahead (each report always covers that year and the previous year) with the exceptions below.

Note: data is unavailable for 1988-1989 (paper copy only). on the Burearu of Justice Statistics. However, there is a [publicly available copy](https://books.google.co.nz/books?id=wiSki41kxX0C&printsec=frontcover) on Google Books for 1989 for which I was able to collect the data. For 1976-1977 for which data is also unavailable from BJS, there are books on Google as well: https://books.google.co.nz/books?id=g4R0xSLy5vQC&printsec=frontcover and https://books.google.co.nz/books?id=aqzy6dxqF84C&printsec=frontcover.

For 1977, pages 81-84 (in book), 96-99 (in Adobe Reader).

## Legal

Data was manually retrieved from interacting with the map at https://deathpenaltyinfo.org/state-and-federal-info/state-by-state

## Innocence

Data was retrieved manually via https://deathpenaltyinfo.org/policy-issues/innocence-database (there is no CSV download)

## Opinion

Data was retrieved from https://news.gallup.com/poll/1606/death-penalty.aspx

# Problems (to be fixed)

https://stackoverflow.com/questions/42237388/syntaxerror-import-declarations-may-only-appear-at-top-level-of-a-module

Note that the `proxy` field in the `package.json` file is necessary to route from `http:://localhost:5000`, otherwise the application will complain about CORS policy related errors. `The application (and Axios) will now recognise to take API requests automatically from http://localhost:5000, i.e. for GET requests you can simply type `axios.get('/getAllExecutionDocuments')` rather than specifying the full ` axios.get('http://localhost:5000/getAllExecutionDocuments')` If you change the port number in Stack A, you will need to change it here as well. See the guide at https://create-react-app.dev/docs/proxying-api-requests-in-development/ for more information. While `create-react-app` uses a live server that automatically reloads on new saved changes, the application will not recognise the `proxy` field unless you stop and restart it with `npm start`.

N.B. If you get an error to do with the proxy, i.e. `Could not proxy request /getAllSentencingDocuments from localhost:4000 to http://localhost:5000` then try forcefully stopping the terminal running Stack B and running it again with `npm start`. This issue has come and gone once or twice for me.

Note: For some reason after a while of doing something else I come back to see the terminal being continously filled with what looks like API requests. Need to find the source...


