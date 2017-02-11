
ALTER TABLE feature
	ADD COLUMN description text,
	ADD COLUMN is_imported boolean DEFAULT true NOT NULL,
	ALTER COLUMN modifier_user_ip TYPE character varying /* TYPE change - table: feature original: inet new: character varying */;
