DO LANGUAGE plpgsql $$
------------------------------------------------------


DECLARE
    rec   record;
BEGIN
FOR rec IN
      SELECT *
      FROM   pg_tables
      WHERE  tablename NOT LIKE 'pg_%' AND schemaname='public' AND tablename NOT LIKE 'schema_version'
      ORDER  BY tablename
  LOOP
    IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=REC.TABLENAME AND COLUMN_NAME='archived') THEN
      RAISE NOTICE '1';
      EXECUTE 'ALTER TABLE ' || QUOTE_IDENT(REC.TABLENAME) || ' DROP COLUMN archived';
      EXECUTE 'ALTER TABLE ' || QUOTE_IDENT(REC.TABLENAME) || ' ADD COLUMN archived TIMESTAMP WITHOUT TIME ZONE';
      RAISE NOTICE '% altered successfully',rec.tablename ;
    ELSE
      RAISE NOTICE '2';
      EXECUTE 'ALTER TABLE ' || QUOTE_IDENT(REC.TABLENAME) || ' ADD COLUMN archived TIMESTAMP WITHOUT TIME ZONE';
      RAISE NOTICE '% added successfully',rec.tablename ;
    END IF;


  END LOOP;


------------------------------------------------------
END$$;