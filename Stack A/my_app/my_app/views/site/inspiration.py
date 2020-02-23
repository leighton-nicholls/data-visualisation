from my_app import app
from flask import jsonify, request, render_template


@app.route('/inspiration') 
def inspiration():
    return render_template('inspiration.html')