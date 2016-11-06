
CREATE TABLE "users" (
"id" serial primary key,
"login" VARCHAR(45) NOT NULL UNIQUE,
"first_name" VARCHAR(255), 
"last_name" VARCHAR(255),
"phone" VARCHAR(255),
"language" char(2),
"email" VARCHAR(255) NOT NULL UNIQUE,
"password" VARCHAR(60) NOT NULL,
"enabled" boolean);


create table user_authority (
id serial primary key,
id_user BIGINT,
id_authority BIGINT);

create table token (
series varchar(50) primary key,
value varchar(50),
date timestamp,
ip_address varchar(50),
user_agent varchar(200),
user_login varchar(50));

create table authority (
id serial primary key,
name varchar(50));