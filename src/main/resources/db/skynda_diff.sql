<<<<<<< HEAD

ALTER TABLE vehicle_feature
	DROP COLUMN text,
	ADD COLUMN feature_id integer DEFAULT 92 NOT NULL;

ALTER TABLE vehicle_feature
	ADD CONSTRAINT "FK_feature_id" FOREIGN KEY (feature_id) REFERENCES classification(id);

ALTER TABLE vehicle_feature
	ADD CONSTRAINT "FK_vehicle_id" FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);

CREATE INDEX "FKI_feature_id" ON vehicle_feature USING btree (feature_id);
=======
>>>>>>> 2d3c39d0156a6b3f8e17fd25aed0b632fa9b637d
