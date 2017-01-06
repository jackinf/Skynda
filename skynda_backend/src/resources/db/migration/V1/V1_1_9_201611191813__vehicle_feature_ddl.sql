DO LANGUAGE plpgsql $$
BEGIN

IF NOT EXISTS (SELECT * FROM "classification" WHERE "classification_type_id" = (SELECT "id" FROM "classification_type" WHERE "name" = 'FEATURE') ) THEN
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 1, 'Parking Sensors', 1, '127.0.0.1', null, 'Parking Sensors', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 2, 'Bluetooth', 1, '127.0.0.1', null, 'Bluetooth', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 3, 'Sunroof', 1, '127.0.0.1', null, 'Sunroof', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 4, 'Navigation', 1, '127.0.0.1', null, 'Navigation', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 5, 'Keyless-Go', 1, '127.0.0.1', null, 'Keyless-Go', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 6, 'Immobilizer', 1, '127.0.0.1', null, 'Immobilizer', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 7, 'Xenon Lights', 1, '127.0.0.1', null, 'Xenon Lights', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 8, 'Alloy Wheels', 1, '127.0.0.1', null, 'Alloy Wheels', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 9, 'Leather Upholstery', 1, '127.0.0.1', null, 'Leather Upholstery', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 10, 'Racing Seats', 1, '127.0.0.1', null, 'Racing Seats', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 11, 'Ventilated Seats', 1, '127.0.0.1', null, 'Ventilated Seats', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 12, 'Seat Heating', 1, '127.0.0.1', null, 'Seat Heating', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 13, 'Mirror Heating', 1, '127.0.0.1', null, 'Mirror Heating', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 14, 'Rain Sensors', 1, '127.0.0.1', null, 'Rain Sensors', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 15, 'Power Steering', 1, '127.0.0.1', null, 'Power Steering', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
		VALUES ('feature', true, 16, 'Cruise Control', 1, '127.0.0.1', null, 'Cruise Control', (SELECT "id" FROM "classification_type" WHERE "name"='FEATURE'), true, NULL);
ELSE
	RAISE NOTICE 'records already exist';
END IF;

IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='vehicle_feature' AND column_name='feature_id')
THEN
  RAISE NOTICE 'column already exists';
ELSE
  ALTER TABLE vehicle_feature
    DROP COLUMN text,
    ADD COLUMN feature_id integer DEFAULT 92 NOT NULL;

  ALTER TABLE vehicle_feature
    ADD CONSTRAINT "FK_feature_id" FOREIGN KEY (feature_id) REFERENCES classification(id);

  ALTER TABLE vehicle_feature
    ADD CONSTRAINT "FK_vehicle_id" FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);

  CREATE INDEX "FKI_feature_id" ON vehicle_feature USING btree (feature_id);
END IF;


END$$;