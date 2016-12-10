
CREATE SEQUENCE subscription_id_seq
	START WITH 1
	INCREMENT BY 1
	NO MAXVALUE
	NO MINVALUE
	CACHE 1;

CREATE TABLE subscription (
	id integer DEFAULT nextval('subscription_id_seq'::regclass) NOT NULL,
	archived time without time zone,
	is_active boolean DEFAULT true NOT NULL,
	email character varying(255) NOT NULL,
	user_id integer
);

ALTER SEQUENCE subscription_id_seq
	OWNED BY subscription.id;

ALTER TABLE subscription
	ADD CONSTRAINT "PK_subscription" PRIMARY KEY (id);

ALTER TABLE subscription
	ADD CONSTRAINT "FK_user_id_subscription" FOREIGN KEY (user_id) REFERENCES users(id);

CREATE INDEX "FKI_user_id_subscription" ON subscription USING btree (user_id);
