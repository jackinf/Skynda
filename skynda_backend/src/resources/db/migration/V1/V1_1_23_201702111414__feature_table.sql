DO LANGUAGE plpgsql $$
BEGIN

ALTER TABLE vehicle_feature
	DROP CONSTRAINT "FK_feature_id";

CREATE SEQUENCE feature_id_seq
	START WITH 1
	INCREMENT BY 1
	NO MAXVALUE
	NO MINVALUE
	CACHE 1;



CREATE TABLE feature (
	id integer DEFAULT nextval('feature_id_seq'::regclass) NOT NULL,
  name character varying(255),
	weight integer,
	"value" text,
  description text,
  is_active boolean DEFAULT true,
	modifier_user_id integer NOT NULL,
	modifier_user_ip inet NOT NULL,
	archived timestamp without time zone,
	is_imported boolean DEFAULT true NOT NULL
);

ALTER SEQUENCE feature_id_seq
	OWNED BY feature.id;

ALTER TABLE feature
	ADD CONSTRAINT "PK_feature" PRIMARY KEY (id);

ALTER TABLE feature
	ADD CONSTRAINT "UNIQUE_feature_row" UNIQUE (value, name);

DELETE FROM public.vehicle_feature;

ALTER TABLE vehicle_feature
	ADD CONSTRAINT "FK_feature_id" FOREIGN KEY (feature_id) REFERENCES feature(id);

ALTER TABLE vehicle_model
	ADD CONSTRAINT "UNIQUE_model" UNIQUE (model_code, vehicle_manufacturer_id, title);

END$$;