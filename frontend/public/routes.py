from flask import Blueprint, json, jsonify, request, send_file
from werkzeug.wrappers.response import Response
from werkzeug.security import check_password_hash, generate_password_hash
import asyncio

from . import DatabaseFunctions as dbf

bp = Blueprint("routes", __name__)
loop = asyncio.new_event_loop()





# @bp.route("/api/get-courses")
# def get_courses():
#     ...


# @bp.route("/api/add-course")
# def add_course():
#     ...


# @bp.route("/api/login")
# def login():
#     ...

@bp.route("/api/register", methods=["POST"])
def register(response):
    req_json = request.get_json()
    assert req_json

    print(req_json)
    name = req_json.get("name")
    email = req_json.get("email")
    password = req_json.get("password")
    password = generate_password_hash(password)
    loop.run_until_complete(dbf.register_user(name, email, password))
    return ("Created", 201)


@bp.route("/favicon.ico")
@bp.route("/static/images/favicon.ico")
def favicon():
    return send_file("./favicon.ico")


@bp.route("/", methods=["GET"])
@bp.route("/<path:path>", methods=["GET"])
def mainPage(path="") -> Response:
    return send_file("./index.html")
