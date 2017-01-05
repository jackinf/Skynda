# README #

## BUILD ##
~~~~
mvn clean package
~~~~

## RUN ##
~~~~
 Run As -> Spring Boot App
 OR
 $ mvn spring-boot:run
 debug mode? dont know
 
 
 API page> http://localhost:8888/swagger-ui.html#/
~~~~

## DATABASE MIGRATION ##
1. All database scripts put under resource/db/migration  
Follow syntax: version_timestamp_name_ddl/dml.sql  
example: V1_1_1_201412031225__initial schema_ddl.sql
  
## DATA Generation ##  
Scripts can be found under resources/generated/skynda_test_data.sql 