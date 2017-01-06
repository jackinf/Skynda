DO LANGUAGE plpgsql $$
BEGIN


------------------------------------------------------
--ADD TABLE
 -- IF EXISTS (SELECT 1 FROM pg_catalog.pg_tables WHERE schemaname='public' AND tablename='users') THEN 
	-- RAISE NOTICE 'table already exists';
 -- ELSE
	------------------------------
	----INSERT CHANGES HERE

	

	----END CHANGES
	------------------------------
 -- END IF;
--CHANGE TABLE COLUMNs
 -- IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='login') THEN 
	-- RAISE NOTICE 'column already exists';
 -- ELSE
	------------------------------
	----INSERT CHANGES HERE

	

	----END CHANGES
	------------------------------
 -- END IF;
--INSERT DATA
-- IF NOT EXISTS (SELECT * FROM "classification_type" WHERE "name" = 'FEATURE') THEN
-- 	------------------------------
	----INSERT CHANGES HERE

	

	----END CHANGES
	------------------------------
-- END IF;



END$$;