DO LANGUAGE plpgsql $$
BEGIN
IF NOT EXISTS (SELECT * FROM "classification" WHERE "value" = 'TOYOTA'
AND "classification_type_id" = (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER')) THEN
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 23, 'TOYOTA', 1, '127.0.0.1', null, 'Toyota', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
END IF;

END$$;