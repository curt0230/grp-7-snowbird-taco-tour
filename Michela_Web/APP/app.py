from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

#Home page
@app.route("/")
def index():

    return render_template("index.html")
#about us
@app.route("/about_us")
def about_us():
    # Return template and data
    return render_template("about_us.html")

#Written Analysis
@app.route("/temp")
def temp():
    # Return template and data
    return render_template("temp.html")

#database
@app.route("/Data_Eng")
def data_eng():
    # Return template and data
    return render_template("Data_Eng.html")

#Tableau dashbord 1
@app.route("/viz1")
def viz1():
    # Return template and data
    return render_template("viz1.html")


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


if __name__ == "__main__":
    app.run(debug=True)
