DO LANGUAGE plpgsql $$
BEGIN

IF NOT EXISTS (SELECT * FROM "image" WHERE "id" = 1) THEN
  INSERT INTO "image" (id, url, blob_name, container_name)
  VALUES (1, 'https://gyazo.com/47758f1bddb6a7446147fe90a9e7dd11', NULL, NULL); -- VEHICLE 1 MAIN IMAGE
  VALUES (2, 'https://gyazo.com/47758f1bddb6a7446147fe90a9e7dd11', NULL, NULL); -- VEHICLE 2 MAIN IMAGE
  VALUES (3, 'https://gyazo.com/47758f1bddb6a7446147fe90a9e7dd11', NULL, NULL); -- VEHICLE 3 MAIN IMAGE
  VALUES (4, 'https://gyazo.com/47758f1bddb6a7446147fe90a9e7dd11', NULL, NULL); -- FAULT
  VALUES (5, 'https://gyazo.com/47758f1bddb6a7446147fe90a9e7dd11', NULL, NULL); -- VEHICLE 1 SUBIMAGE
  VALUES (6, 'https://gyazo.com/47758f1bddb6a7446147fe90a9e7dd11', NULL, NULL); -- VEHICLE 1 SUBIMAGE
  VALUES (7, 'https://gyazo.com/47758f1bddb6a7446147fe90a9e7dd11', NULL, NULL); -- VEHICLE 2 SUBIMAGE
  VALUES (8, 'https://gyazo.com/47758f1bddb6a7446147fe90a9e7dd11', NULL, NULL); -- VEHICLE 2 SUBIMAGE
  VALUES (9, 'https://gyazo.com/47758f1bddb6a7446147fe90a9e7dd11', NULL, NULL); -- VEHICLE 3 SUBIMAGE
  VALUES (10, 'https://gyazo.com/47758f1bddb6a7446147fe90a9e7dd11', NULL, NULL); -- VEHICLE 3 SUBIMAGE
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle_model" WHERE "id" = 1) THEN
  INSERT INTO "vehicle_model" (id, model_code, description, vehicle_manufacturer_id, title, engine, horse_power,
    doors, seats, year, archived, transmission_id, drivetrain_id, vehicle_body_id, fuel_type_id)
  VALUES (1, 'CODE 1', 'DESCRIPTION',
          (SELECT "id" FROM "classification" WHERE "value"='MAZDA'),
             'TITLE 1', 'ENGINE 1', 200, 5, 4, 2012, NULL,
          (SELECT "id" FROM "classification" WHERE "value"='Automatic'),
          (SELECT "id" FROM "classification" WHERE "value"='Four-Wheel Drive'),
          (SELECT "id" FROM "classification" WHERE "value"='Coupe'),
          (SELECT "id" FROM "classification" WHERE "value"='Petrol'));
  INSERT INTO "vehicle_model" (id, model_code, description, vehicle_manufacturer_id, title, engine, horse_power,
    doors, seats, year, archived, transmission_id, drivetrain_id, vehicle_body_id, fuel_type_id)
  VALUES (2, 'CODE 2', 'DESCRIPTION',
          (SELECT "id" FROM "classification" WHERE "value"='MAZDA'),
             'TITLE 2', 'ENGINE 2', 250, 3, 2, 2014, NULL,
          (SELECT "id" FROM "classification" WHERE "value"='Automatic'),
          (SELECT "id" FROM "classification" WHERE "value"='Rear-Wheel Drive'),
          (SELECT "id" FROM "classification" WHERE "value"='Pickup'),
          (SELECT "id" FROM "classification" WHERE "value"='Electric'));
  INSERT INTO "vehicle_model" (id, model_code, description, vehicle_manufacturer_id, title, engine, horse_power,
    doors, seats, year, archived, transmission_id, drivetrain_id, vehicle_body_id, fuel_type_id)
  VALUES (3, 'CODE 3', 'DESCRIPTION',
          (SELECT "id" FROM "classification" WHERE "value"='MAZDA'),
             'TITLE 3', 'ENGINE 3', 100, 6, 6, 2012, NULL,
          (SELECT "id" FROM "classification" WHERE "value"='Manual'),
          (SELECT "id" FROM "classification" WHERE "value"='Front-Wheel Drive'),
          (SELECT "id" FROM "classification" WHERE "value"='Saddle'),
          (SELECT "id" FROM "classification" WHERE "value"='Diesel'));
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle" WHERE "id" = 1) THEN
  INSERT INTO "vehicle" ("id", "vin_code", "price", "created", "registration_number", "mileage", "color_outside",
    "color_inside", "fuel_city", "fuel_highway", "problems", "compression_ratio", "compression_type", "configuration",
    "cylinders", "displacement", "size", "torque", "total_valves", "safety_stars", "additional", "archived",
    "vehicle_model_id", "owner_id", "image_id")
  VALUES (1, '1FMZU77E03UA49889', 10293, '12/12/2012', 'L9O4WO', 12000, 'black', 'red', 'Tallinn', 'FUEL HIGHWAY 1',
             'Leakage found', 1, 'Dynamic Displacement', 'CONFIGURATION 1', 5, 'DISPLACEMENT 1', 5, 4, 3, 4, 'Great car!'
    , NULL, (SELECT "id" FROM "vehicle_model" WHERE "model_code"='CODE 1'),
          (SELECT "id" FROM "users" WHERE "first_name"='steve'), 1);

  INSERT INTO "vehicle" ("id", "vin_code", "price", "created", "registration_number", "mileage", "color_outside",
    "color_inside", "fuel_city", "fuel_highway", "problems", "compression_ratio", "compression_type", "configuration",
    "cylinders", "displacement", "size", "torque", "total_valves", "safety_stars", "additional", "archived",
    "vehicle_model_id", "owner_id", "image_id")
  VALUES (1, '1FMZU77E03UA49888', 10293, '11/11/2012', 'L9O4WO', 12000, 'black', 'red', 'Tallinn', 'FUEL HIGHWAY 2',
             'Leakage found', 1, 'Dynamic Displacement', 'CONFIGURATION 2', 4, 'DISPLACEMENT 2', 5, 4, 3, 4, 'Bad car!'
    , NULL, (SELECT "id" FROM "vehicle_model" WHERE "model_code"='CODE 2'),
          (SELECT "id" FROM "users" WHERE "first_name"='steve'), 2);

  INSERT INTO "vehicle" ("id", "vin_code", "price", "created", "registration_number", "mileage", "color_outside",
    "color_inside", "fuel_city", "fuel_highway", "problems", "compression_ratio", "compression_type", "configuration",
    "cylinders", "displacement", "size", "torque", "total_valves", "safety_stars", "additional", "archived",
    "vehicle_model_id", "owner_id", "image_id")
  VALUES (1, '1FMZU77E03UA49887', 10293, '10/10/2012', 'L9O4WO', 12000, 'blue', 'green', 'Tallinn', 'FUEL HIGHWAY 3',
             'Leakage found', 1, 'Dynamic Displacement', 'CONFIGURATION 3', 3, 'DISPLACEMENT 3', 5, 4, 3, 4, 'Good car!'
    , NULL, (SELECT "id" FROM "vehicle_model" WHERE "model_code"='CODE 3'),
          (SELECT "id" FROM "users" WHERE "first_name"='steve'), 3);
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle_description" WHERE "id" = 1) THEN
  INSERT INTO "vehicle_description" (id, title, content, archived)
  VALUES (1, 'New Age', 'Bacon ipsum dolor amet kielbasa brisket hamburger jowl beef. Swine chicken ground round ' ||
                        'tongue fatback kielbasa short loin turducken burgdoggen ham doner strip steak.', NULL);
  VALUES (2, 'Universal', 'Bacon ipsum dolor amet kielbasa brisket hamburger jowl beef. Swine chicken ground round ' ||
                        'tongue fatback kielbasa short loin turducken burgdoggen ham doner strip steak.', NULL);
  VALUES (3, 'Unusual', 'Bacon ipsum dolor amet kielbasa brisket hamburger jowl beef. Swine chicken ground round ' ||
                        'tongue fatback kielbasa short loin turducken burgdoggen ham doner strip steak.', NULL);
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle_fault" WHERE "id" = 1) THEN
  INSERT INTO "vehicle_fault" (id, image_id, text, vehicle_id, archived)
  VALUES (1, 4, 'Broken handle', 1, NULL);
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle_feature" WHERE "id" = 1) THEN
  INSERT INTO "vehicle_feature" (id, text, vehicle_id, archived)
  VALUES (1, 'FEATURE 11', 1, NULL);
  VALUES (2, 'FEATURE 12', 1, NULL);
  VALUES (3, 'FEATURE 13', 1, NULL);
  VALUES (4, 'FEATURE 21', 2, NULL);
  VALUES (5, 'FEATURE 22', 2, NULL);
  VALUES (6, 'FEATURE 31', 3, NULL);
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle_image" WHERE "id" = 1) THEN
  INSERT INTO "vehicle_image" (id, image_id, vehicle_id, archived)
  VALUES (1, 5, 1, NULL);
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle_report" WHERE "id" = 1) THEN
  INSERT INTO "vehicle_report" (id, vehicle_id, title, is_pass, points_text, faults_text, fauls_img, archived)
  VALUES (1, 1, 'REPORT 1', TRUE, 'POINTS TEXT', NULL, NULL, NULL);
  VALUES (2, 2, 'REPORT 1', TRUE, 'POINTS TEXT', NULL, NULL, NULL);
END IF;

IF NOT EXISTS (SELECT * FROM "vehicle_review" WHERE "id" = 1) THEN
  INSERT INTO "vehicle_review" (id, vehicle_id, logo_url, video_url, text, rating, archived)
  VALUES (1, 1, 'https://gyazo.com/da9503d279c75a75691fb34ceeefc513', 'https://youtu.be/YRLw55eGMn8', 'REVIEW TEXT 1', 5, NULL);
  VALUES (2, 1, 'https://gyazo.com/da9503d279c75a75691fb34ceeefc513', 'https://youtu.be/YRLw55eGMn8', 'REVIEW TEXT 2', 4, NULL);
  VALUES (3, 2, 'https://gyazo.com/da9503d279c75a75691fb34ceeefc513', 'https://youtu.be/YRLw55eGMn8', 'REVIEW TEXT 2', 4, NULL);
END IF;

END$$;