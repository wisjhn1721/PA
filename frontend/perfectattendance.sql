CREATE TABLE IF NOT EXISTS student(
    id serial,
    full_name text NOT NULL,
    email varchar(120) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS course(
    id serial,
    instructor varchar(120) NOT NULL,
    name varchar(120) NOT NULL,
    start_date timestamp NOT NULL,
    end_date timestamp NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS instructor(
    id serial,
    full_name varchar(120) NOT NULL, 
    email varchar(120) UNIQUE NOT NULL,
    password_hash varchar(128) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS student_to_course (
    student_id int NOT NULL,
    course_id int NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES student (id),
    FOREIGN KEY (course_id) REFERENCES course (id)
);


GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO superuser;
ALTER USER postgres WITH PASSWORD 'new_password';

