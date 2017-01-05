DO LANGUAGE plpgsql $$
BEGIN


------------------------------------------------------

--CHANGE TABLE COLUMNs
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='vehicle' AND column_name='safety_url') THEN
	  RAISE NOTICE 'column already exists';
  ELSE
	------------------------------
	----INSERT CHANGES HERE


ALTER TABLE vehicle
	ADD COLUMN safety_url character varying(200);


	----END CHANGES
	------------------------------
  END IF;
--INSERT DATA
-- IF NOT EXISTS (SELECT * FROM "classification_type" WHERE "name" = 'FEATURE') THEN
-- 	------------------------------
	----INSERT CHANGES HERE



	----END CHANGES
	------------------------------
-- END IF;



END$$;