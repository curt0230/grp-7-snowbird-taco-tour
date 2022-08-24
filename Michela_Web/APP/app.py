
from flask import Flask, render_template, redirect, request, jsonify
from modelHelper import ModelHelper
from sqlHelper import SQLHelper
import json

# Create an instance of Flask
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

modelHelper = ModelHelper()
sqlHelper = SQLHelper()

# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

@app.route("/about_us")
def about_us():
    # Return template and data
    return render_template("about_us.html")

@app.route("/sql_table")
def sql_table():
    # Return template and data
    return render_template("sql_page.html")

@app.route("/sql_graphs")
def sql_graphs():
    # Return template and data
    return render_template("sql_graphs.html")

#Tableau dashbord 1
@app.route("/viz1")
def viz1():
    # Return template and data
    return render_template("viz1.html")
@app.route("/ml")
def ml():
    # Return template and data
    return render_template("ml.html")

@app.route("/makePredictions", methods=["POST"])
def make_predictions():
    content = request.json["data"]
    print(content)
    
    # parse
    BusinessAcceptsCreditCards = content(["BusinessAcceptsCreditCards"])
    GoodForKids = int(content(["GoodForKids"]))
    WheelchairAccessible = int(content(["WheelchairAccessible"]))
    AlcoholId = int(content(["AlcoholId"]))
    BusinessParkingTypeId = int(content(["BusinessParkingTypeId"]))
    RestaurantsTypeId = int(content(["RestaurantsTypeId"]))
    GoodForMealTypeId = int(content(["GoodForMealTypeId"]))
    latitude = float(content(["latitude"]))
    longitude = float(content(["longitude"]))

    preds = modelHelper.makePredictions(BusinessAcceptsCreditCards, GoodForKids, WheelchairAccessible, AlcoholId,BusinessParkingTypeId, RestaurantsTypeId, GoodForMealTypeId, latitude, longitude)
    return(jsonify({"ok": True, "prediction": str(preds)}))



@app.route("/getSQL", methods=["POST"])
def get_sql():
    content = request.json["data"]
    print(content)
    
    # parse
    city = content["city"]
    state = content["state"]
    df = sqlHelper.getDataFromDatabase(city, state)
    return(jsonify(json.loads(df.to_json(orient="records"))))


@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r

#main
if __name__ == "__main__":
    app.run(debug=True)
