# README #
## SOFTWARE ##
1. https://spring.io/tools/sts
2. jdk8
3. maven latest

## BUILD ##
~~~~
mvn clean package
~~~~

## RUN ##
1. Run As -> Spring Boot App
2. API available here: http://localhost:8080/car

## DATABASE MIGRATION ##
1. All database scripts put under resource/db/migration  
Follow syntax: version_timestamp_name_ddl/dml.sql  
example: V1_1_1_201412031225__initial schema_ddl.sql

## EA model location ##
1. https://mruskin@bitbucket.org/mruskin/skyndaea.git