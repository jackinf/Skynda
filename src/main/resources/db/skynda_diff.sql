
CREATE SEQUENCE vehicle_report_item_id_seq
	START WITH 1
	INCREMENT BY 1
	NO MAXVALUE
	NO MINVALUE
	CACHE 1;

CREATE TABLE vehicle_report_item (
	id integer DEFAULT nextval('vehicle_report_item_id_seq'::regclass) NOT NULL,
	vehicle_id integer,
	title character varying(50),
	description text
);

ALTER TABLE vehicle
	ADD COLUMN report_title character varying(50);

ALTER SEQUENCE vehicle_report_item_id_seq
	OWNED BY vehicle_report_item.id;

ALTER TABLE vehicle_report_item
	ADD CONSTRAINT "PK_report_item_id" PRIMARY KEY (id);

ALTER TABLE vehicle_report_item
	ADD CONSTRAINT "FK_vehicle_report_item_vehicle_id" FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);

CREATE INDEX "FKI_vehicle_report_item_vehicle_id" ON vehicle_report_item USING btree (vehicle_id);
