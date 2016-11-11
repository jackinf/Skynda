
ALTER TABLE vehicle
	DROP CONSTRAINT "FK_owner_id";

ALTER TABLE payment
	DROP CONSTRAINT "FK_customer_id";

ALTER TABLE user_authority
	DROP CONSTRAINT "FK_user_id";

DROP TABLE "user";

ALTER SEQUENCE user_id_seq
	OWNED BY users.id;

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
