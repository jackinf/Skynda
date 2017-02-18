DO LANGUAGE plpgsql $$
BEGIN

ALTER TABLE vehicle_feature
	ADD CONSTRAINT "UNIQUE_vehicle_feature" UNIQUE (vehicle_id, feature_id, archived);

ALTER TABLE vehicle
	ADD CONSTRAINT "UNIQUE_vin" UNIQUE (vin_code);


END$$;