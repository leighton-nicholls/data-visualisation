# Data Visualisation (work in progress)

Choropleth map showing trends of capital punishment in the United States 1976-2019. Shows public opinion rates and crime statistics over time.

## Starting the server

To start the server, navigate to the `/flaskr` directory level and run `python app.py`. The application should now be available at `http://127.0.0.1:8080/`.

## Starting the mongodb server

To connect to MongoDB database, you must have MongoEngine installed. Use `pip install mongoengine`. Once MongoEngine is installed, open up a cmd and run `mongod`. You should receive a bunch of output, with a message similar to `2019-09-17T07:46:06.639+1200 I  CONTROL  [initandlisten] MongoDB starting : pid=17672 port=27017 dbpath=C:\data\db\ 64-bit host=D206-66735`. Note that you must create a directory under the C:\ directory, i.e. `C:\data\db`. Otherwise, running `mongod` returns an error saying `NonExistentPath: Data directory C:\data\db not found., terminating`. **mongod** does not create this folder automatically for you, you MUST create the folder yourself.

Once the `mongod` service is running, minimise the cmd window (don't close it) and leave it running. Open up another cmd process and execute the command `mongo`. The Mongo shell should open up and you can now run Mongo commands. For example, `show dbs`, `use web3`, `show collections` etc. Make sure to keep the other `mongod` process running at all times in the background.

To view the data in a GUI version, download MongoDB Compass. Connect to `localhost` with port number `27017`. This is the same as the method above, although this is the graphical version. You don't need mongod running at the same time.