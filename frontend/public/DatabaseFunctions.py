import asyncpg

async def get_postgres_connection() -> asyncpg.pool.Pool:
    DB_URL = (
        "postgres://postgres:postgres@perfectattendance-postgres:5432/perfectattendance"
    )
    conn = await asyncpg.create_pool(
        dsn=DB_URL,
    )
    assert conn, print("Could not establish a database connection")
    return conn


async def register_user(name: str, email: str, pass_hash: str):
    db = await get_postgres_connection()
    query = """ INSERT INTO instructor VALUES (%s, %s, %s); """
    args = (name, email, pass_hash)
    async with db.acquire() as conn:
        async with conn.transaction():
            status_msg = await conn.execute(query, *args)
            rows_affected = int(status_msg.split()[-1])
            return rows_affected

