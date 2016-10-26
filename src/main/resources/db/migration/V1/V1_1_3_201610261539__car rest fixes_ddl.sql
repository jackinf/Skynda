DROP TABLE IF EXISTS "car_image" CASCADE
;

DROP TABLE IF EXISTS "car_feature" CASCADE
;

DROP TABLE IF EXISTS "car_fault" CASCADE
;

/* For storing image url-s for car */
CREATE TABLE "car_image"
(
	"id" serial,
	"image_url" varchar(100),
	"cars_for_sale_id" integer REFERENCES "cars_for_sale" (id)
)
;

/* For storing car features */
CREATE TABLE "car_feature"
(
	"id" serial,
	"text" varchar(100),
	"cars_for_sale_id" integer REFERENCES "cars_for_sale" (id)
)
;

/* for storing car faults */
CREATE TABLE "car_fault"
(
	"id" serial,
	"image_url" varchar(100),
	"text" varchar(100),
	"cars_for_sale_id" integer REFERENCES "cars_for_sale" (id)
)
;

/* They are now foreign keys, no need for those columns */
ALTER TABLE "cars_for_sale" DROP COLUMN IF EXISTS "features";
ALTER TABLE "cars_for_sale" DROP COLUMN IF EXISTS "images";