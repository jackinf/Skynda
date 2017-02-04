DO LANGUAGE plpgsql $$
BEGIN


DROP INDEX "FKI_vehicle_id_car_fault";
ALTER TABLE vehicle_fault
	DROP COLUMN vehicle_id,
	ADD COLUMN vehicle_report_category_id integer DEFAULT 1 NOT NULL;

ALTER TABLE vehicle_fault
	ADD CONSTRAINT "FK_vehicle_report_category_id" FOREIGN KEY (vehicle_report_category_id) REFERENCES vehicle_fault(id);

CREATE INDEX "FKI_fault_vehicle_report_category_id" ON vehicle_fault USING btree (vehicle_report_category_id);

END$$;