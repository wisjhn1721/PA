# STL
import os
import json
import logging

# PDM
import flask_cors
from flask_cors.decorator import cross_origin
from flask import Flask, json, jsonify, request, send_file
from werkzeug.wrappers.response import Response
from werkzeug.security import check_password_hash, generate_password_hash


# local
from psqlconnect import database_execute, database_query

app = Flask(__name__)
flask_cors.CORS(app)

debug = False

logging.getLogger("flask_cors").level = logging.DEBUG
logging.getLogger().level = logging.DEBUG
logging.getLogger(__name__).level = logging.DEBUG

LOG = logging.getLogger(__name__)
LOG.error("Initialized logger")


@app.before_request
def before_request():
    LOG.debug("Debug test")
    LOG.info("Info test")
    LOG.warning("Warning test")
    LOG.error("Error test")


@app.after_request
def after_request(response):
    header = response.headers
    header["Access-Control-Allow-Origin"] = "*"
    return response


@app.route("/test")
def test():
    return "Yes, we're here.", 200


@app.route("/api/get-courses", methods=["GET"])
def get_courses():
    assert isinstance(request.args, dict)
    instructor_id = request.args.get("instructor_id")
    query = """SELECT c.id, c.name as course_name, c.start_date, c.end_date, 
    i.full_name as instructor from course c, instructor i WHERE 
    c.instructor = %s;"""

    courses = database_query(query, (str(instructor_id), ))
    return jsonify([{**r} for r in courses])


@app.route("/api/add-course", methods=["POST"])
def add_course():
    req_json = request.json
    assert isinstance(req_json, dict)

    instructor_id = req_json.get("instructor_id")
    course_name = req_json.get("course")
    start_date = req_json.get("start_date")
    end_date = req_json.get("end_date")
    students = req_json.get("students")

    database_execute(
        "INSERT INTO course (instructor, name, start_date, end_date) VALUES (%s, %s, %s, %s) RETURNING id;",
        (instructor_id, course_name, start_date, end_date),
    )


@app.route("/api/login", methods=["POST"])
def login():
    req_json = request.json
    assert isinstance(req_json, dict)

    email = req_json.get("email")
    password = req_json.get("password")

    possible_account = database_query(
        "SELECT * FROM instructor where email = %s;", (email,)
    )
    if possible_account:
        account = [{**r} for r in possible_account][0]
        pass_hash = account["password_hash"]
        print(check_password_hash(pass_hash, password))
        if check_password_hash(pass_hash, password):
            return jsonify({"success": dict(possible_account)})
    return json.dumps({"errors": ["The email/password combination failed!"]})


@app.route("/api/register", methods=["POST"])
def register():
    req_json = request.json
    assert isinstance(req_json, dict)

    name = req_json.get("name")
    email = req_json.get("email")
    password = req_json.get("password")
    password_hash = generate_password_hash(password)

    duplicate_email = database_query(
        "SELECT * FROM instructor where email = %s", (email,)
    )
    if duplicate_email:
        return json.dumps({"errors": ["That email already exists!"]})

    query = "INSERT INTO instructor (full_name, email, password_hash) VALUES (%s, %s, %s) RETURNING *;"
    args = (name, email, password_hash)

    user = database_execute(query, args)
    assert user, print("I failed")
    return json.dumps({"success": dict(user)})


if __name__ == "__main__":
    debug = True
    app.run(debug=debug, host="0.0.0.0")
