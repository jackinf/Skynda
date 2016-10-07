DROP TABLE IF EXISTS "insurance_companies" CASCADE
;

DROP TABLE IF EXISTS "finance_companies" CASCADE
;

DROP TABLE IF EXISTS "insurance_policies" CASCADE
;

DROP TABLE IF EXISTS "car_loans" CASCADE
;

DROP TABLE IF EXISTS "payment_status" CASCADE
;

DROP TABLE IF EXISTS "cars_sold" CASCADE
;

DROP TABLE IF EXISTS "customer_payments" CASCADE
;

DROP TABLE IF EXISTS "addresses" CASCADE
;

DROP TABLE IF EXISTS "customer" CASCADE
;

DROP TABLE IF EXISTS "car_manufacturer" CASCADE
;

DROP TABLE IF EXISTS "car_models" CASCADE
;

DROP TABLE IF EXISTS "cars_for_sale" CASCADE
;

DROP TABLE IF EXISTS "car_review" CASCADE
;

DROP TABLE IF EXISTS "car_report" CASCADE
;

CREATE TABLE "insurance_companies"
(
	"insurance_company_id" serial NOT NULL,
	"insurance_company_name" varchar(100)	
)
;

CREATE TABLE "finance_companies"
(
	"finance_company_id" serial NOT NULL,
	"finance_company_name" varchar(100)	
)
;

CREATE TABLE "insurance_policies"
(
	"policy_id" serial,
	"car_sold_id" integer,
	"policy_start_date" timestamp,
	"policy_renewal_date" timestamp,
	"monthly_payments" decimal(10,2),
	"insurance_company_id" integer
)
;

CREATE TABLE "car_loans"
(
	"loan_id" serial,
	"car_sold_id" integer,
	"repayment_start_date" timestamp,
	"repayment_end_date" timestamp,
	"monthly_repayments" decimal(10,2),
	"finance_company_id" integer
)
;

CREATE TABLE "payment_status"
(
	"payment_status_code" serial,
	"payment_status_description" varchar(500)	
)
;

CREATE TABLE "cars_sold"
(
	"car_sold_id" serial,
	"cars_for_sale_id" integer,
	"agreed_price" decimal(10,2),
	"customer_id" integer,
	"date_sold" timestamp,
	"monthly_payment_amount" decimal(10,2),
	"monthly_payment_date" timestamp
)
;

CREATE TABLE "customer_payments"
(
	"customer_payment_id" serial,
	"customer_id" integer,
	"payment_status_code" integer,
	"car_sold_id" integer,
	"customer_payment_date_due" timestamp,
	"customer_payment_date_made" timestamp,
	"actual_payment_amount" decimal(10,2) NOT NULL
)
;

CREATE TABLE "addresses"
(
	"address_id" serial,
	"linn" varchar(100)	 NOT NULL,
	"maakond" varchar(100)	,
	"vald" varchar(100)	,
	"street" varchar(100)	 NOT NULL,
	"house_number_name" varchar(100)	 NOT NULL,
	"apartment_nr" varchar(50)	 NOT NULL,
	"postal_code" varchar(50)	
)
;

CREATE TABLE "customer"
(
	"customer_id" serial,
	"phone" varchar(50)	,
	"firstname" varchar(100)	 NOT NULL,
	"lastname" varchar(100)	 NOT NULL,
	"email" varchar(100)	,
	"address_id" integer
)
;

CREATE TABLE "car_manufacturer"
(
	"manufacturer_code" varchar(100)	 NOT NULL,
	"title" varchar(255),
	"description" text
)
;

CREATE TABLE "car_models"
(
	"model_code" varchar(100)	 NOT NULL,
	"manufacturer_code" varchar(100)	 NOT NULL,
	"description" text,
	"title" varchar(255),
	"transmission" varchar(50)	 NOT NULL,
	"engine" varchar(100)	 NOT NULL,
	"horse_power" varchar(100)	,
	"drive" varchar(255)	 NOT NULL,
	"doors" varchar(50)	 NOT NULL,
	"seats" varchar(50)	 NOT NULL,
	"year"  varchar(50) NOT NULL,
	"body_type" varchar(100)	 NOT NULL
)
;

CREATE TABLE "cars_for_sale"
(
	"id" serial,
	"model_code" varchar(100)	 NOT NULL,
	"report_id" integer,
	"review_id" integer,
	--"manufacturer_code" varchar(100)	 NOT NULL, --SHOULD IT BE HERE...I THINK NO!!!
	"vin_code" varchar(100)	 NOT NULL,
	"price" decimal(10,2) NOT NULL,
	"created" timestamp NOT NULL,
	"customer_id" integer,
	"registration_number" varchar(100)	 NOT NULL,
	"mileage" varchar(100)	 NOT NULL,
	"color_outside" varchar(100)	 NOT NULL,
	"color_inside" varchar(100)	 NOT NULL,
	"images" text NOT NULL,
	"is_sold" boolean,
	"fuel_city" varchar(100)	,
	"fuel_highway" varchar(100)	,
	"features" text,
	"problems" varchar(255),
	"compression_ratio" varchar(50),
	"compression_type" varchar(50),
	"configuration" varchar(50),
	"cylinders" varchar(50),
	"displacement" varchar(50),
	"fuel_type" varchar(50),
	"size" varchar(50), --WTF is size???
	"torque" varchar(50),
	"total_valves" varchar(50),
	"power_train" varchar(50),
	"safety_stars" varchar(50)
)
;

CREATE TABLE "car_report"
(
	"report_id" serial,
	"title" varchar(50),
	"is_pass" boolean,
	"points_text" text,
	"faults_text" text,
	"fauls_img" text
)
;

CREATE TABLE "car_review"
(
	"review_id" serial,
	"logo_url" varchar(255),
	"video_url" varchar(255),
	"text" text,
	"rating" varchar(50)
)
;

ALTER TABLE "insurance_companies" ADD CONSTRAINT "PK_insurance_companies"
	PRIMARY KEY ("insurance_company_id")
;

ALTER TABLE "finance_companies" ADD CONSTRAINT "PK_finance_companies"
	PRIMARY KEY ("finance_company_id")
;

CREATE INDEX "IXFK_insurance_policies_cars_sold" ON "insurance_policies" ("car_sold_id" ASC)
;

CREATE INDEX "IXFK_insurance_policies_insurance_companies" ON "insurance_policies" ("insurance_company_id" ASC)
;

ALTER TABLE "insurance_policies" ADD CONSTRAINT "PK_insurance_policies"
	PRIMARY KEY ("policy_id")
;

CREATE INDEX "IXFK_car_loans_cars_sold" ON "car_loans" ("car_sold_id" ASC)
;

CREATE INDEX "IXFK_car_loans_finance_companies" ON "car_loans" ("finance_company_id" ASC)
;

ALTER TABLE "car_loans" ADD CONSTRAINT "PK_car_loans"
	PRIMARY KEY ("loan_id")
;

ALTER TABLE "payment_status" ADD CONSTRAINT "PK_payment_status"
	PRIMARY KEY ("payment_status_code")
;

CREATE INDEX "IXFK_cars_sold_cars_for_sale" ON "cars_sold" ("cars_for_sale_id" ASC)
;

CREATE INDEX "IXFK_cars_sold_customer" ON "cars_sold" ("customer_id" ASC)
;

ALTER TABLE "cars_sold" ADD CONSTRAINT "PK_cars_sold"
	PRIMARY KEY ("car_sold_id")
;

CREATE INDEX "IXFK_customer_payments_cars_sold" ON "customer_payments" ("car_sold_id" ASC)
;

CREATE INDEX "IXFK_customer_payments_customer" ON "customer_payments" ("customer_id" ASC)
;

CREATE INDEX "IXFK_customer_payments_payment_status" ON "customer_payments" ("payment_status_code" ASC)
;

ALTER TABLE "customer_payments" ADD CONSTRAINT "PK_customer_payments"
	PRIMARY KEY ("customer_payment_id")
;

ALTER TABLE "addresses" ADD CONSTRAINT "PK_addresses"
	PRIMARY KEY ("address_id")
;

CREATE INDEX "IXFK_customer_addresses" ON "customer" ("address_id" ASC)
;

ALTER TABLE "customer" ADD CONSTRAINT "PK_customer"
	PRIMARY KEY ("customer_id")
;

ALTER TABLE "car_manufacturer" ADD CONSTRAINT "PK_car_manufacturer"
	PRIMARY KEY ("manufacturer_code")
;

CREATE INDEX "IXFK_car_models_car_manufacturer" ON "car_models" ("manufacturer_code" ASC)
;

ALTER TABLE "car_models" ADD CONSTRAINT "PK_car_models"
	PRIMARY KEY ("model_code")
;

CREATE INDEX "IXFK_cars_for_sale_car_models" ON "cars_for_sale" ("model_code" ASC)
;

CREATE INDEX "IXFK_cars_for_sale_customer" ON "cars_for_sale" ("customer_id" ASC)
;

ALTER TABLE "cars_for_sale" ADD CONSTRAINT "PK_Car"
	PRIMARY KEY ("id")
;

ALTER TABLE "insurance_policies" ADD CONSTRAINT "FK_insurance_policies_cars_sold"
	FOREIGN KEY ("car_sold_id") REFERENCES "cars_sold" ("car_sold_id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "insurance_policies" ADD CONSTRAINT "FK_insurance_policies_insurance_companies"
	FOREIGN KEY ("insurance_company_id") REFERENCES "insurance_companies" ("insurance_company_id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "car_loans" ADD CONSTRAINT "FK_car_loans_cars_sold"
	FOREIGN KEY ("car_sold_id") REFERENCES "cars_sold" ("car_sold_id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "car_loans" ADD CONSTRAINT "FK_car_loans_finance_companies"
	FOREIGN KEY ("finance_company_id") REFERENCES "finance_companies" ("finance_company_id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "cars_sold" ADD CONSTRAINT "FK_cars_sold_cars_for_sale"
	FOREIGN KEY ("cars_for_sale_id") REFERENCES "cars_for_sale" ("id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "cars_sold" ADD CONSTRAINT "FK_cars_sold_customer"
	FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "customer_payments" ADD CONSTRAINT "FK_customer_payments_cars_sold"
	FOREIGN KEY ("car_sold_id") REFERENCES "cars_sold" ("car_sold_id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "customer_payments" ADD CONSTRAINT "FK_customer_payments_customer"
	FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "customer_payments" ADD CONSTRAINT "FK_customer_payments_payment_status"
	FOREIGN KEY ("payment_status_code") REFERENCES "payment_status" ("payment_status_code") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "customer" ADD CONSTRAINT "FK_customer_addresses"
	FOREIGN KEY ("address_id") REFERENCES "addresses" ("address_id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "car_models" ADD CONSTRAINT "FK_car_models_car_manufacturer"
	FOREIGN KEY ("manufacturer_code") REFERENCES "car_manufacturer" ("manufacturer_code") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "cars_for_sale" ADD CONSTRAINT "FK_cars_for_sale_car_models"
	FOREIGN KEY ("model_code") REFERENCES "car_models" ("model_code") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "cars_for_sale" ADD CONSTRAINT "FK_cars_for_sale_customer"
	FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "cars_for_sale" ADD CONSTRAINT "FK_cars_for_sale_car_report"
	FOREIGN KEY ("report_id") REFERENCES "car_report" ("report_id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "cars_for_sale" ADD CONSTRAINT "FK_cars_for_sale_car_review"
	FOREIGN KEY ("review_id") REFERENCES "car_review" ("review_id") ON DELETE No Action ON UPDATE No Action
;
