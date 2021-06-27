-- Seeing as we will be testing out this script alot we can destroy the db before creating everything again
\c postgres

DROP DATABASE IF EXISTS myappdb;

-- Create the db
CREATE DATABASE myappdb;

-- Move into the db
\c myappdb

-- Create our table if it doesn't already exist
CREATE TABLE IF NOT EXISTS Orders
(
    id SERIAL PRIMARY KEY,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    item character varying(250),
    quantity INT,
    price DECIMAL,
    total_price DECIMAL
);

-- Changes the owner of the table to postgres which is the default when installing postgres
ALTER TABLE Orders
    OWNER to postgres;