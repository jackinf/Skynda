
ALTER TABLE vehicle DROP COLUMN fuel_city;
ALTER TABLE vehicle DROP COLUMN fuel_highway;

ALTER TABLE vehicle
	ADD COLUMN fuel_city numeric(5,2) /* TYPE change - table: vehicle original: character varying(100) new: numeric(5,2) */,
	ADD COLUMN fuel_highway numeric(5,2) /* TYPE change - table: vehicle original: character varying(100) new: numeric(5,2) */;

UPDATE public.vehicle SET fuel_city = '8', fuel_highway = '6';

ALTER TABLE vehicle_model DROP COLUMN seats;
ALTER TABLE vehicle_model ADD COLUMN seats integer DEFAULT 2;