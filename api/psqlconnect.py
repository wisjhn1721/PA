# STD
import os
import logging

# PIP
import psycopg2
from psycopg2.extras import DictCursor


LOG = logging.getLogger(__name__)
url =  "postgres://postgres:postgres@pa-postgres:5432/perfectattendance"

def _connect():
    kwargs = {
        "user": "postgres",
        "password": "new_password",
        "host": "pa-postgres",
        "dbname": "perfectattendance"
    }
    return psycopg2.connect(**kwargs, cursor_factory=DictCursor)


def database_execute(query: str, args):
    conn = _connect()
    ret = None
    with conn.cursor(cursor_factory=DictCursor) as cursor:
        cursor.execute(query, args)
        ret = cursor.fetchone()
        conn.commit()
    conn.close()
    return ret


def database_query(query: str, args):
    conn = _connect()
    with conn.cursor(cursor_factory=DictCursor) as cursor:
        cursor.execute(query, args)
        rows = cursor.fetchall()
    conn.close()
    return rows


if __name__ == "__main__":
    print("Testing database connection...")
    database_execute("SELECT * FROM genre;", tuple())
    print("Success!")
