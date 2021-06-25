---Create Tables
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id int identity NOT NULL,
    username varchar(255) NOT NULL UNIQUE,
   -- firstName varchar(255) NOT NULL,
   -- lastName varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
	address varchar(255) NOT NULL,
    PRIMARY KEY(username)
);
