# README #
## SOFTWARE ##
1. https://spring.io/tools/sts
2. jdk8
3. maven latest
4. lombok fix. Add following code to your ".ini" file. Also you need to start lombok.jar and your IDE location. (for STS users)

```
-Xmx1200m
-javaagent:lombok.jar
-javaagent:C:\Users\mihha\Desktop\sts-bundle\sts-3.8.1.RELEASE\lombok.jar
-Xbootclasspath/a:C:\Users\mihha\Desktop\sts-bundle\sts-3.8.1.RELEASE\lombok.jar
```


## BUILD ##
~~~~
mvn clean package
~~~~

## RUN ##
1. Run As -> Spring Boot App
2. API available here: http://localhost:8080/vehicle

## DATABASE MIGRATION ##
1. All database scripts put under resource/db/migration  
Follow syntax: version_timestamp_name_ddl/dml.sql  
example: V1_1_1_201412031225__initial schema_ddl.sql

## EA model location ##
1. https://mruskin@bitbucket.org/mruskin/skyndaea.git
  
## DATA Generation ##  
Scripts can be found under resources/generated/skynda_test_data.sql  
For data generation was used: Datanamic Data Generator (.dtp file at the same directory)