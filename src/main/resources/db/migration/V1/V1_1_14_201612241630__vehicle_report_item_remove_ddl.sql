DO LANGUAGE plpgsql $$
BEGIN


------------------------------------------------------

--CHANGE TABLE COLUMNs
  IF EXISTS (SELECT 1 FROM pg_catalog.pg_tables WHERE schemaname='public' AND tablename='vehicle_report_item') THEN

DROP TABLE vehicle_report_item;

DROP SEQUENCE vehicle_report_item_id_seq;

ALTER TABLE vehicle_report_category
	ADD COLUMN description character varying;

 ELSE
	------------------------------
	----INSERT CHANGES HERE

RAISE NOTICE 'table already removed';

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