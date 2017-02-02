DO LANGUAGE plpgsql $$
BEGIN

ALTER TABLE vehicle_fault
	DROP CONSTRAINT "FK_vehicle_report_category_id";

ALTER TABLE vehicle_fault
	ADD CONSTRAINT "FK_report_category_id_fault" FOREIGN KEY (vehicle_report_category_id) REFERENCES vehicle_report_category(id);


END$$;