DO LANGUAGE plpgsql $$
BEGIN

ALTER TABLE feature
	ALTER COLUMN modifier_user_ip TYPE character varying;

END$$;