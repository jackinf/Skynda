
CREATE TABLE "user" (
"id" serial primary key,
"username" VARCHAR(45) NOT NULL,
"email" VARCHAR(255) NOT NULL,
"password" VARCHAR(60) NOT NULL,
"enabled" integer NOT NULL DEFAULT 1);

   
CREATE TABLE "user_role" (
"id" serial primary key,
"userid" integer,
"user_role" varchar(45) not null);

ALTER TABLE "user_role" ADD CONSTRAINT "fk_user_idx" FOREIGN KEY ("userid") REFERENCES "user" ("id") ON DELETE No Action ON UPDATE No Action;
