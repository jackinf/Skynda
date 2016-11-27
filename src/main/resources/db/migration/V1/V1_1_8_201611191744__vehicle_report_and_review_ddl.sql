
DROP TABLE vehicle_report;

CREATE SEQUENCE vehicle_report_category_item_id_seq
	START WITH 1
	INCREMENT BY 1
	NO MAXVALUE
	NO MINVALUE
	CACHE 1;

DROP SEQUENCE IF EXISTS car_report_report_id_seq;
	CREATE SEQUENCE car_report_report_id_seq
	START WITH 1
	INCREMENT BY 1
	NO MAXVALUE
	NO MINVALUE
	CACHE 1;

CREATE TABLE vehicle_report_category (
	id integer DEFAULT nextval('car_report_report_id_seq'::regclass) NOT NULL,
	vehicle_id integer NOT NULL,
	title character varying(50),
	archived time without time zone
);

CREATE TABLE vehicle_report_category_item (
	id integer DEFAULT nextval('vehicle_report_category_item_id_seq'::regclass) NOT NULL,
	text character varying(50),
	is_pass boolean,
	vehicle_report_category_id integer,
	archived time without time zone
);

ALTER TABLE vehicle_review
	DROP COLUMN logo_url,
	DROP COLUMN video_url,
	ADD COLUMN logo_id integer,
	ADD COLUMN video_id integer;

ALTER SEQUENCE vehicle_report_category_item_id_seq
	OWNED BY vehicle_report_category_item.id;

ALTER TABLE IF EXISTS vehicle_report_category
	ADD CONSTRAINT "PK_vehicle_report" PRIMARY KEY (id);

ALTER TABLE vehicle_report_category_item
	ADD CONSTRAINT "PK_vehicle_report_category_item_id" PRIMARY KEY (id);

ALTER TABLE vehicle_review
	ADD CONSTRAINT "FK_logo_id" FOREIGN KEY (logo_id) REFERENCES image(id);

ALTER TABLE vehicle_review
	ADD CONSTRAINT "FK_video_id" FOREIGN KEY (video_id) REFERENCES image(id);

ALTER TABLE vehicle_report_category_item
	ADD CONSTRAINT "FK_vehicle_report_category_id" FOREIGN KEY (vehicle_report_category_id) REFERENCES vehicle_report_category(id);

CREATE INDEX "FKI_vehicle_id_car_report" ON vehicle_report_category USING btree (vehicle_id);

CREATE INDEX "FKI_logo_id" ON vehicle_review USING btree (logo_id);

CREATE INDEX "FKI_video_id" ON vehicle_review USING btree (video_id);

CREATE INDEX "FKI_vehicle_report_category_id" ON vehicle_report_category_item USING btree (vehicle_report_category_id);

-- Seed
INSERT INTO "vehicle_report_category" (id, vehicle_id, title, archived) VALUES
	(1, 1, 'REPORT CATEGORY 1', NULL),
	(2, 1, 'REPORT CATEGORY 2', NULL);

INSERT INTO "vehicle_report_category_item" (id, text, is_pass, vehicle_report_category_id, archived) VALUES
	(1, 'REPORT CATEGORY 1 ITEM 1', TRUE, 1, NULL),
	(2, 'REPORT CATEGORY 1 ITEM 2', FALSE, 1, NULL),
	(3, 'REPORT CATEGORY 1 ITEM 3', TRUE, 1, NULL),
	(4, 'REPORT CATEGORY 2 ITEM 1', TRUE, 2, NULL),
	(5, 'REPORT CATEGORY 2 ITEM 2', FALSE, 2, NULL),
	(6, 'REPORT CATEGORY 2 ITEM 3', FALSE, 2, NULL);

SELECT pg_catalog.setval(pg_get_serial_sequence('vehicle_report_category', 'id'), (SELECT MAX(id) FROM vehicle_report_category)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('vehicle_report_category_item', 'id'), (SELECT MAX(id) FROM vehicle_report_category_item)+1);
