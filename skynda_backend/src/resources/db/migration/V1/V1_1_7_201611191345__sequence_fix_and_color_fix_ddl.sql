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

UPDATE vehicle SET color_inside_id = 35;
UPDATE vehicle SET color_outside_id = 36;

-- Reset all sequence values of all tables, which already contain seed data
SELECT pg_catalog.setval(pg_get_serial_sequence('authority', 'id'), (SELECT MAX(id) FROM authority)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('classification', 'id'), (SELECT MAX(id) FROM classification)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('classification_type', 'id'), (SELECT MAX(id) FROM classification_type)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('image', 'id'), (SELECT MAX(id) FROM image)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('user_authority', 'id'), (SELECT MAX(id) FROM user_authority)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('users', 'id'), (SELECT MAX(id) FROM users)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('vehicle', 'id'), (SELECT MAX(id) FROM vehicle)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('vehicle_description', 'id'), (SELECT MAX(id) FROM vehicle_description)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('vehicle_fault', 'id'), (SELECT MAX(id) FROM vehicle_fault)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('vehicle_feature', 'id'), (SELECT MAX(id) FROM vehicle_feature)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('vehicle_image', 'id'), (SELECT MAX(id) FROM vehicle_image)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('vehicle_model', 'id'), (SELECT MAX(id) FROM vehicle_model)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('vehicle_report', 'id'), (SELECT MAX(id) FROM vehicle_report)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('vehicle_review', 'id'), (SELECT MAX(id) FROM vehicle_review)+1);