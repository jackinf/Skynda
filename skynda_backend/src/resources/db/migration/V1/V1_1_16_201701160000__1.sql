DO LANGUAGE plpgsql $$
------------------------------------------------------


BEGIN

 IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='vehicle_report_category_item' AND column_name='title') THEN
	  RAISE NOTICE 'column already exists';
  ELSE
    ALTER TABLE public.vehicle_report_category_item ADD COLUMN title character varying(255);
  END IF;


------------------------------------------------------
END$$;