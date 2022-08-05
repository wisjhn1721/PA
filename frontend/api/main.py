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
import asyncio

import psycopg2
from psycopg2.extras import DictCursor

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



# @bp.route("/api/get-courses")
# def get_courses():
#     return { "courses": "one" }


# @bp.route("/api/add-course")
# def add_course():
#     ...


# @bp.route("/api/login")
# def login():
#     ...

@app.route("/api/register", methods=["POST"])
def register():
    req_json = request.json
    assert req_json

    print(req_json)
    name = req_json.get("name")
    email = req_json.get("email")
    password = req_json.get("password")
    password_hash = generate_password_hash(password)

    duplicate_email = database_query("SELECT * FROM instructor where email = $1", (email, ))
    if duplicate_email:
        return json.dumps({ "errors": ["That email already exists!"] })

    query = "INSERT INTO instructor VALUES ($1, $2, $3);"
    args = (name, email, password_hash)

    database_execute(query, args)
    return json.dumps({ "success": True })


# @app.route("/get-genres")
# @cross_origin()
# def get_genres():
#     records = database_query("SELECT * FROM genre;", tuple())
#     return jsonify([{**record} for record in records])


# @app.route("/get-adventures")
# @cross_origin()
# def get_adventures():
#     records = database_query("SELECT * FROM adventure;", tuple())
#     return jsonify([{**record} for record in records])


# @app.route("/add-adventure", methods=["POST"])
# @cross_origin()
# def add_adventure():
#     LOG.warning("/add-adventure called")
#     genre_id = request.json.get("genre_id")
#     name = request.json.get("name")
#     description = request.json.get("description")
#     creator = request.json.get("creator") or "Anonymous"
#     paths = request.json.get("paths")

#     query = """
#     INSERT INTO adventure (
#         genre_id, 
#         name, 
#         description, 
#         creator, 
#         paths
#     ) 
#     VALUES (
#         %s, 
#         %s, 
#         %s,
#         %s,
#         %s
#     ) RETURNING id;
#     """

    # records = database_query(
    #     query, (genre_id, name, description, creator, json.dumps(paths))
    # )

    # return str(records[0]), 200


if __name__ == "__main__":
    debug = True
    app.run(debug=debug, host="0.0.0.0")
