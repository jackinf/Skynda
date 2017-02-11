DO LANGUAGE plpgsql $$
BEGIN

ALTER TABLE vehicle_report_category_item
	ALTER COLUMN text TYPE character varying;


END$$;