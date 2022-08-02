
from flask import Blueprint, json, jsonify, request, send_file
from werkzeug.wrappers.response import Response

bp = Blueprint("routes", __name__)


@bp.route("/api/get-courses")
def get_courses():
    ...


@bp.route("/api/add-course")
def add_course():
    ...


@bp.route("/api/login")
def login():
    ...


@bp.route("/api/register")
def regiseter():
    ...


@bp.route("/favicon.ico")
@bp.route("/static/images/favicon.ico")
def favicon():
    return send_file("./favicon.ico")


@bp.route("/", methods=["GET"])
@bp.route("/<path:path>", methods=["GET"])
def mainPage(path="") -> Response:
    return send_file("./index.html")
