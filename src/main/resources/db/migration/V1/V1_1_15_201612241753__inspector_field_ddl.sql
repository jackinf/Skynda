DO LANGUAGE plpgsql $$
BEGIN


------------------------------------------------------

 IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='vehicle_report_category' AND column_name='inspector_name') THEN
	  RAISE NOTICE 'column already exists';
  ELSE
	------------------------------
	----INSERT CHANGES HERE


ALTER TABLE vehicle_report_category
	ADD COLUMN inspector_name character varying(100);


	----END CHANGES
	------------------------------
  END IF;



END$$;