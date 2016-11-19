
ALTER TABLE vehicle
	DROP COLUMN color_outside,
	DROP COLUMN color_inside,
	ADD COLUMN color_outside_id integer,
	ADD COLUMN color_inside_id integer;

ALTER TABLE vehicle
	ADD CONSTRAINT "FK_color_inside_id" FOREIGN KEY (color_inside_id) REFERENCES classification(id);

ALTER TABLE vehicle
	ADD CONSTRAINT "FK_color_outside_id" FOREIGN KEY (color_outside_id) REFERENCES classification(id);

CREATE INDEX "FKI_color_inside_id" ON vehicle USING btree (color_inside_id);

CREATE INDEX "FKI_color_outside_id" ON vehicle USING btree (color_outside_id);
