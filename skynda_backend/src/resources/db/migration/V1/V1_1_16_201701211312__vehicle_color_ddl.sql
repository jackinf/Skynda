DO LANGUAGE plpgsql $$
BEGIN

ALTER TABLE vehicle
	DROP CONSTRAINT "FK_color_inside_id";

ALTER TABLE vehicle
	DROP CONSTRAINT "FK_color_outside_id";

DROP INDEX "FKI_color_inside_id";

DROP INDEX "FKI_color_outside_id";

ALTER TABLE vehicle
	DROP COLUMN color_outside_id,
	DROP COLUMN color_inside_id,
	ADD COLUMN color_outside_hex character varying(20),
	ADD COLUMN color_inside_hex character varying(20);

END$$;