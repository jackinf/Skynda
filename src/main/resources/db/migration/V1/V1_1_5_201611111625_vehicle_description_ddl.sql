DO LANGUAGE plpgsql $$
BEGIN

  IF EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name = 'vehicle_description' AND column_name = 'vehicle_id')
  THEN
    RAISE NOTICE 'column already exists';
  ELSE
    ----------------------------
    --INSERT CHANGES HERE

    ALTER TABLE vehicle_description
      ADD COLUMN vehicle_id INTEGER NOT NULL;

    ALTER TABLE vehicle_description
      ADD CONSTRAINT "FK_vehicle_id" FOREIGN KEY (vehicle_id) REFERENCES vehicle (id);

    CREATE INDEX "FKI_vehicle_id"
      ON vehicle_description USING BTREE (vehicle_id);

    ALTER TABLE vehicle_description
      DROP CONSTRAINT car_description_pkey;

    ALTER TABLE vehicle_fault
      DROP CONSTRAINT "PK_car_fault";

    ALTER TABLE vehicle_image
      DROP CONSTRAINT "PK_car_image";

    ALTER TABLE vehicle
      DROP CONSTRAINT "PK_car_for_sale";

    CREATE SEQUENCE image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

    CREATE TABLE image (
      id             INTEGER DEFAULT nextval('image_id_seq' :: REGCLASS) NOT NULL,
      url            CHARACTER VARYING(255),
      blob_name      CHARACTER VARYING(100),
      container_name CHARACTER VARYING(100),
      archived       TIME WITHOUT TIME ZONE
    );

    ALTER TABLE vehicle_fault
      DROP COLUMN image_url,
      ADD COLUMN image_id INTEGER;

    ALTER TABLE vehicle_image
      DROP COLUMN image_url,
      ADD COLUMN image_id INTEGER NOT NULL;

    ALTER TABLE vehicle
      ADD COLUMN image_id INTEGER NOT NULL;

    ALTER SEQUENCE image_id_seq
    OWNED BY image.id;

    ALTER TABLE vehicle_description
      ADD CONSTRAINT vehicle_description_pkey PRIMARY KEY (id);

    ALTER TABLE vehicle_fault
      ADD CONSTRAINT "PK_vehicle_fault" PRIMARY KEY (id);

    ALTER TABLE vehicle_image
      ADD CONSTRAINT "PK_vehicle_image" PRIMARY KEY (id);

    ALTER TABLE vehicle
      ADD CONSTRAINT "PK_vehicle" PRIMARY KEY (id);

    ALTER TABLE image
      ADD CONSTRAINT "PK_image" PRIMARY KEY (id);

    ALTER TABLE vehicle_fault
      ADD CONSTRAINT "FK_image_id" FOREIGN KEY (image_id) REFERENCES image (id);

    ALTER TABLE vehicle_image
      ADD CONSTRAINT "FK_image_id" FOREIGN KEY (image_id) REFERENCES image (id);

    ALTER TABLE vehicle
      ADD CONSTRAINT "FK_image_id" FOREIGN KEY (image_id) REFERENCES image (id);

    CREATE INDEX "FKI_image_id"
      ON vehicle_fault USING BTREE (image_id);

    CREATE INDEX "FKI_image_id_vehicle_image"
      ON vehicle_image USING BTREE (image_id);

    CREATE INDEX "FKI_image_id_vehicle"
      ON vehicle USING BTREE (image_id);

    --END CHANGES
    ----------------------------
  END IF;

END$$;