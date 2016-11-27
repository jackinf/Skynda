DO LANGUAGE plpgsql $$
BEGIN

IF NOT EXISTS (SELECT * FROM "authority" WHERE "id" = 1) THEN
  INSERT INTO "authority" (id, name, archived) VALUES (1, 'admin', NULL);
  INSERT INTO "authority" (id, name, archived) VALUES (2, 'simple', NULL);
  INSERT INTO "authority" (id, name, archived) VALUES (3, 'guest', NULL);
END IF;

IF NOT EXISTS (SELECT * FROM "users" WHERE "id" = 1) THEN
  INSERT INTO "users" ( id, login, first_name, last_name, phone, language, email, password, enabled, archived)
      VALUES (1, 'steve', 'Steve', 'Jobs', '876432543', 'en', 'jbr91@mail.ru', 'steve', TRUE, NULL);
  INSERT INTO "users" (id, login, first_name, last_name, phone, language, email, password, enabled, archived)
      VALUES (2, 'bill', 'Bill', 'Gates', '245763478', 'et', 'zeka.rum@gmail.com', 'bill', TRUE, NULL);
END IF;

IF NOT EXISTS (SELECT * FROM "user_authority" WHERE "user_id" = 1) THEN
  INSERT INTO "user_authority" (id, user_id, authority_id, archived) VALUES (1, 1, 1, NULL);
  INSERT INTO "user_authority" (id, user_id, authority_id, archived) VALUES (2, 1, 2, NULL);
  INSERT INTO "user_authority" (id, user_id, authority_id, archived) VALUES (3, 1, 3, NULL);
  INSERT INTO "user_authority" (id, user_id, authority_id, archived) VALUES (4, 2, 3, NULL);
END IF;

END$$;