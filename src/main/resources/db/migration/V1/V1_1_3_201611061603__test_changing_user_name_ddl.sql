DO LANGUAGE plpgsql $$
BEGIN


------------------------------------------------------
--ADD TABLE
 IF EXISTS (SELECT 1 FROM pg_catalog.pg_tables WHERE schemaname='public' AND tablename='users') THEN
	RAISE NOTICE 'table already exists';
 ELSE
	----------------------------
	--INSERT CHANGES HERE


ALTER TABLE vehicle
	DROP CONSTRAINT "FK_owner_id";

ALTER TABLE payment
	DROP CONSTRAINT "FK_customer_id";

ALTER TABLE user_authority
	DROP CONSTRAINT "FK_user_id";

DROP TABLE "user";

DROP SEQUENCE IF EXISTS user_id_seq;
CREATE SEQUENCE user_id_seq;

CREATE TABLE users (
	id integer DEFAULT nextval('user_id_seq'::regclass) NOT NULL,
	login character varying(45) NOT NULL,
	first_name character varying(255),
	last_name character varying(255),
	phone character varying(255),
	"language" character(2),
	email character varying(255) NOT NULL,
	password character varying(100) NOT NULL,
	enabled boolean,
	archived timestamp without time zone
);

ALTER SEQUENCE user_id_seq
   OWNED BY users.id;

ALTER TABLE users
	ADD CONSTRAINT user_pkey PRIMARY KEY (id);

ALTER TABLE vehicle
	ADD CONSTRAINT "FK_owner_id" FOREIGN KEY (owner_id) REFERENCES users(id);

ALTER TABLE payment
	ADD CONSTRAINT "FK_customer_id" FOREIGN KEY (customer_id) REFERENCES users(id);

ALTER TABLE user_authority
	ADD CONSTRAINT "FK_user_id" FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE users
	ADD CONSTRAINT user_email_key UNIQUE (email);

ALTER TABLE users
	ADD CONSTRAINT user_login_key UNIQUE (login);


	--END CHANGES
	----------------------------
 END IF;
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