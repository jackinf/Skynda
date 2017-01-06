DO LANGUAGE plpgsql $$
BEGIN

IF NOT EXISTS (SELECT * FROM "image" WHERE "id" = 1) THEN
  INSERT INTO "image" (id, url, blob_name, container_name)
  VALUES (1, 'https://i.gyazo.com/405e9a6d6d289c573dc9762082752398.png', NULL, NULL), -- VEHICLE 1 MAIN IMAGE
  (2, 'https://i.gyazo.com/cb7962b1546b9c73c9944a6cdd40c107.png', NULL, NULL), -- VEHICLE 2 MAIN IMAGE
  (3, 'https://i.gyazo.com/9f5ce1b52e34042f5a1e5d594d4a75db.png', NULL, NULL), -- VEHICLE 3 MAIN IMAGE
  (4, 'https://i.gyazo.com/47758f1bddb6a7446147fe90a9e7dd11.png', NULL, NULL), -- FAULT
  (5, 'https://i.gyazo.com/3d5af088cb874c0b2c171551d159fa9a.png', NULL, NULL), -- VEHICLE 1 SUBIMAGE
  (6, 'https://i.gyazo.com/242e83fc719a42011b63c5f32157b21a.jpg', NULL, NULL), -- VEHICLE 1 SUBIMAGE
  (7, 'https://i.gyazo.com/22d894f92c0fa28d9117d4f4402cbabf.png', NULL, NULL), -- VEHICLE 2 SUBIMAGE
  (8, 'https://i.gyazo.com/c65f210dcb4d2e38c41e7630753c2a36.png', NULL, NULL), -- VEHICLE 2 SUBIMAGE
  (9, 'https://i.gyazo.com/6d88f41cc868e36dc86e742b3f360102.png', NULL, NULL), -- VEHICLE 3 SUBIMAGE
  (10, 'https://i.gyazo.com/de1894f62ce8b1a679f6a9e553c69a3c.png', NULL, NULL); -- VEHICLE 3 SUBIMAGE
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle_model" WHERE "id" = 1) THEN
  INSERT INTO "vehicle_model" (id, model_code, description, vehicle_manufacturer_id, title, engine, horse_power,
    doors, seats, year, archived, transmission_id, drivetrain_id, vehicle_body_id, fuel_type_id) VALUES

    (1, 'CODE 1', 'DESCRIPTION',
    (SELECT "id" FROM "classification" WHERE LOWER("value")=LOWER('MAZDA')),
       'TITLE 1', 'ENGINE 1', 200, 5, 4, 2012, NULL,
    (SELECT "id" FROM "classification" WHERE LOWER("value")=LOWER('AUTOMATIC')),
    (SELECT "id" FROM "classification" WHERE LOWER("value") LIKE LOWER('ALL')),
    (SELECT "id" FROM "classification" WHERE LOWER("value")=LOWER('COUPE')),
    (SELECT "id" FROM "classification" WHERE LOWER("value")=LOWER('PETROL'))),

    (2, 'CODE 2', 'DESCRIPTION',
    (SELECT "id" FROM "classification" WHERE LOWER("value")=LOWER('MAZDA')),
       'TITLE 2', 'ENGINE 2', 250, 3, 2, 2014, NULL,
    (SELECT "id" FROM "classification" WHERE LOWER("value")=LOWER('AUTOMATIC')),
    (SELECT "id" FROM "classification" WHERE LOWER("value")=LOWER('REAR')),
    (SELECT "id" FROM "classification" WHERE LOWER("value")=LOWER('PICKUP')),
    (SELECT "id" FROM "classification" WHERE LOWER("value")=LOWER('ELECTRIC'))),

    (3, 'CODE 3', 'DESCRIPTION',
    (SELECT "id" FROM "classification" WHERE LOWER("value")=LOWER('MAZDA')),
       'TITLE 3', 'ENGINE 3', 100, 6, 6, 2012, NULL,
    (SELECT "id" FROM "classification" WHERE LOWER("value")=LOWER('MANUAL')),
    (SELECT "id" FROM "classification" WHERE LOWER("value")=LOWER('FRONT')),
    (SELECT "id" FROM "classification" WHERE LOWER("value")=LOWER('SADDLE')),
    (SELECT "id" FROM "classification" WHERE LOWER("value")=LOWER('DIESEL')));
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle" WHERE "id" = 1) THEN
  INSERT INTO "vehicle" ("id", "vin_code", "price", "created", "registration_number", "mileage", "color_outside",
    "color_inside", "fuel_city", "fuel_highway", "problems", "compression_ratio", "compression_type", "configuration",
    "cylinders", "displacement", "size", "torque", "total_valves", "safety_stars", "additional", "archived",
    "vehicle_model_id", "owner_id", "image_id") VALUES

  (1, '1FMZU77E03UA49889', 10293, '12/12/2012', 'L9O4WO', 12000, 'black', 'red', 'Tallinn', 'FUEL HIGHWAY 1',
  'Leakage found', 1, 'Dynamic Displacement', 'CONFIGURATION 1', 5, 'DISPLACEMENT 1', 5, 4, 3, 4, 'Great car!', NULL,
  (SELECT "id" FROM "vehicle_model" WHERE "model_code"='CODE 1'),
  (SELECT "id" FROM "users" WHERE "first_name"='Steve'), 1),

  (2, '1FMZU77E03UA49888', 10293, '11/11/2012', 'L9O4WO', 12000, 'black', 'red', 'Tallinn', 'FUEL HIGHWAY 2',
  'Leakage found', 1, 'Dynamic Displacement', 'CONFIGURATION 2', 4, 'DISPLACEMENT 2', 5, 4, 3, 4, 'Bad car!', NULL,
  (SELECT "id" FROM "vehicle_model" WHERE "model_code"='CODE 2'),
  (SELECT "id" FROM "users" WHERE "first_name"='Steve'), 2),

  (3, '1FMZU77E03UA49887', 10293, '10/10/2012', 'L9O4WO', 12000, 'blue', 'green', 'Tallinn', 'FUEL HIGHWAY 3',
  'Leakage found', 1, 'Dynamic Displacement', 'CONFIGURATION 3', 3, 'DISPLACEMENT 3', 5, 4, 3, 4, 'Good car!', NULL,
  (SELECT "id" FROM "vehicle_model" WHERE "model_code"='CODE 3'),
  (SELECT "id" FROM "users" WHERE "first_name"='Steve'), 3);
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle_description" WHERE "id" = 1) THEN
  INSERT INTO "vehicle_description" (id, title, content, archived, vehicle_id) VALUES
  (1, 'New Age', 'Bacon ipsum dolor amet kielbasa brisket hamburger jowl beef. Swine chicken ground round ' ||
    'tongue fatback kielbasa short loin turducken burgdoggen ham doner strip steak.', NULL, 1),
  (2, 'Universal', 'Bacon ipsum dolor amet kielbasa brisket hamburger jowl beef. Swine chicken ground round ' ||
    'tongue fatback kielbasa short loin turducken burgdoggen ham doner strip steak.', NULL, 1),
  (3, 'Unusual', 'Bacon ipsum dolor amet kielbasa brisket hamburger jowl beef. Swine chicken ground round ' ||
    'tongue fatback kielbasa short loin turducken burgdoggen ham doner strip steak.', NULL, 2);
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle_fault" WHERE "id" = 1) THEN
  INSERT INTO "vehicle_fault" (id, image_id, text, vehicle_id, archived) VALUES (1, 4, 'Broken handle', 1, NULL);
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle_feature" WHERE "id" = 1) THEN
  INSERT INTO "vehicle_feature" (id, text, vehicle_id, archived) VALUES
  (1, 'FEATURE 11', 1, NULL),
  (2, 'FEATURE 12', 1, NULL),
  (3, 'FEATURE 13', 1, NULL),
  (4, 'FEATURE 21', 2, NULL),
  (5, 'FEATURE 22', 2, NULL),
  (6, 'FEATURE 31', 3, NULL);
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle_image" WHERE "id" = 1) THEN
  INSERT INTO "vehicle_image" (id, image_id, vehicle_id, archived) VALUES
    (1, 5, 1, NULL),
    (2, 6, 1, NULL),
    (3, 7, 2, NULL),
    (4, 8, 2, NULL),
    (5, 9, 3, NULL),
    (6, 10, 3, NULL);
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle_report" WHERE "id" = 1) THEN
  INSERT INTO "vehicle_report" (id, vehicle_id, title, is_pass, points_text, archived) VALUES
    (1, 1, 'REPORT 1', TRUE, 'POINTS TEXT', NULL),
    (2, 2, 'REPORT 1', TRUE, 'POINTS TEXT', NULL);
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle_review" WHERE "id" = 1) THEN
  INSERT INTO "vehicle_review" (id, vehicle_id, logo_url, video_url, text, rating, archived) VALUES
    (1, 1, 'https://i.gyazo.com/da9503d279c75a75691fb34ceeefc513.png', 'https://youtu.be/YRLw55eGMn8', 'REVIEW TEXT 1', 5, NULL),
    (2, 1, 'https://i.gyazo.com/da9503d279c75a75691fb34ceeefc513.png', 'https://youtu.be/YRLw55eGMn8', 'REVIEW TEXT 2', 4, NULL),
    (3, 2, 'https://i.gyazo.com/da9503d279c75a75691fb34ceeefc513.png', 'https://youtu.be/YRLw55eGMn8', 'REVIEW TEXT 2', 4, NULL);
END IF;

END$$;