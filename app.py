from flask import Flask, render_template, request, redirect, url_for, send_from_directory
import os

app = Flask(__name__)

# In-memory storage for diary entries (for demo purposes)
diary_entries = []

@app.route("/")
def home():
    return send_from_directory('.', 'home.html')

@app.route("/index.html")
def index():
    return send_from_directory('.', 'index.html')

@app.route("/thoughts.html")
def thoughts():
    return send_from_directory('.', 'thoughts.html')

@app.route("/goals.html")
def goals():
    return send_from_directory('.', 'goals.html')

@app.route("/achivements.html")
def achievements():
    return send_from_directory('.', 'achivements.html')

@app.route("/notes.html")
def notes():
    return send_from_directory('.', 'notes.html')

@app.route("/home.html")
def home_html():
    return send_from_directory('.', 'home.html')

@app.route("/home")
def home_page():
    return redirect(url_for('home_html'))

@app.route("/attendance.html")
def attendance():
    return send_from_directory('.', 'attendance.html')

@app.route("/intial.html")
def initial():
    return send_from_directory('.', 'intial.html')

@app.route("/script.js")
def script():
    return send_from_directory('.', 'script.js')

@app.route("/style.css")
def style():
    return send_from_directory('.', 'style.css')

@app.route("/add", methods=["GET", "POST"])
def add_entry():
    if request.method == "POST":
        entry = request.form.get("entry")
        if entry:
            diary_entries.append(entry)
        return redirect(url_for("home"))
    return render_template("add_entry.html")

@app.route("/api/save", methods=["POST"])
def save_data():
    """API endpoint to save data from JavaScript"""
    data = request.get_json()
    # Here you could save to a database
    # For now, just return success
    return {"status": "success", "message": "Data saved successfully"}

@app.route("/api/load", methods=["GET"])
def load_data():
    """API endpoint to load saved data"""
    # Here you could load from a database
    # For now, return empty data
    return {"data": []}

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)