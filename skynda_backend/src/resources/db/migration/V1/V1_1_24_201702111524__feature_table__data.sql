DO LANGUAGE plpgsql $$
BEGIN

IF NOT EXISTS (SELECT * FROM "feature") THEN
	INSERT INTO "feature" ("id", "description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'), 'feature', true, 1, 'Parking Sensors', 1, '127.0.0.1', null, 'Parking Sensors', true);
INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 2, 'Bluetooth', 1, '127.0.0.1', null, 'Bluetooth', true);

INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 3, 'Sunroof', 1, '127.0.0.1', null, 'Sunroof', true);
INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 4, 'Navigation', 1, '127.0.0.1', null, 'Navigation', true);

INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 5, 'Keyless-Go', 1, '127.0.0.1', null, 'Keyless-Go', true);

INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 6, 'Immobilizer', 1, '127.0.0.1', null, 'Immobilizer', true);

INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 7, 'Xenon Lights', 1, '127.0.0.1', null, 'Xenon Lights', true);
INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 8, 'Alloy Wheels', 1, '127.0.0.1', null, 'Alloy Wheels', true);
INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 9, 'Leather Upholstery', 1, '127.0.0.1', null, 'Leather Upholstery', true);
INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 10, 'Racing Seats', 1, '127.0.0.1', null, 'Racing Seats', true);

INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 11, 'Ventilated Seats', 1, '127.0.0.1', null, 'Ventilated Seats', true);
INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 12, 'Seat Heating', 1, '127.0.0.1', null, 'Seat Heating', true);
INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 13, 'Mirror Heating', 1, '127.0.0.1', null, 'Mirror Heating', true);
INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 14, 'Rain Sensors', 1, '127.0.0.1', null, 'Rain Sensors', true);

INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 15, 'Power Steering', 1, '127.0.0.1', null, 'Power Steering', true);
INSERT INTO "feature" ("id","description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "is_active")
		VALUES (nextval('feature_id_seq'),'feature', true, 16, 'Cruise Control', 1, '127.0.0.1', null, 'Cruise Control', true);


ELSE
	RAISE NOTICE 'records already exist';
END IF;


END$$;