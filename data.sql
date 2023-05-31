DROP DATABASE IF EXISTS bankly;
CREATE DATABASE bankly;
\c bankly

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    username text PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    password text NOT NULL,
    admin boolean DEFAULT false
);

DROP DATABASE IF EXISTS bankly_test;
CREATE DATABASE bankly_test;
\c bankly_test

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    username text PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    password text NOT NULL,
    admin boolean DEFAULT false
);
