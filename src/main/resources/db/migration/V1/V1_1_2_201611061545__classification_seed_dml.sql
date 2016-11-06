DO LANGUAGE plpgsql $$
BEGIN

IF NOT EXISTS (SELECT * FROM "classification_type" WHERE "name" = 'FEATURE') THEN
	INSERT INTO "classification_type" ("name", "description", "modifier_user_id", "modifier_user_ip", "archived") VALUES ('FEATURE', 'vehicle feature', 1, '127.0.0.1', null);
END IF;

IF NOT EXISTS (SELECT * FROM "classification_type" WHERE "name" = 'PAYMENT_TYPE') THEN
	INSERT INTO "classification_type" ("name", "description", "modifier_user_id", "modifier_user_ip", "archived") VALUES ('PAYMENT_TYPE', 'single or recurring payment', 1, '127.0.0.1', null);

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 1, 'FULL', 1, '127.0.0.1', null, 'Single payment', (SELECT "id" FROM "classification_type" WHERE "name"='PAYMENT_TYPE'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 1, 'RECURRING', 1, '127.0.0.1', null, 'Recurring payment', (SELECT "id" FROM "classification_type" WHERE "name"='PAYMENT_TYPE'), true, null);
END IF;

IF NOT EXISTS (SELECT * FROM "classification_type" WHERE "name" = 'DRIVETRAIN') THEN
	INSERT INTO "classification_type" ("name", "description", "modifier_user_id", "modifier_user_ip", "archived") VALUES ('DRIVETRAIN', 'vehicle feature', 1, '127.0.0.1', null);

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 1, 'FRONT', 1, '127.0.0.1', null, 'Front-Wheel Drive', (SELECT "id" FROM "classification_type" WHERE "name"='DRIVETRAIN'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 1, 'REAR', 1, '127.0.0.1', null, 'Rear-Wheel Drive', (SELECT "id" FROM "classification_type" WHERE "name"='DRIVETRAIN'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 1, 'ALL', 1, '127.0.0.1', null, 'Four-Wheel Drive', (SELECT "id" FROM "classification_type" WHERE "name"='DRIVETRAIN'), true, null);
END IF;

IF NOT EXISTS (SELECT * FROM "classification_type" WHERE "name" = 'TRANSMISSION') THEN
	INSERT INTO "classification_type" ("name", "description", "modifier_user_id", "modifier_user_ip", "archived") VALUES ('TRANSMISSION', 'transmission type', 1, '127.0.0.1', null);

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 1, 'MANUAL', 1, '127.0.0.1', null, 'Manual', (SELECT "id" FROM "classification_type" WHERE "name"='TRANSMISSION'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 2, 'AUTOMATIC', 1, '127.0.0.1', null, 'Automatic', (SELECT "id" FROM "classification_type" WHERE "name"='TRANSMISSION'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 3, 'SEMIAUTOMATIC', 1, '127.0.0.1', null, 'Semi-Automatic', (SELECT "id" FROM "classification_type" WHERE "name"='TRANSMISSION'), true, null);
END IF;

IF NOT EXISTS (SELECT * FROM "classification_type" WHERE "name" = 'PAYMENT_STATUS') THEN
	INSERT INTO "classification_type" ("name", "description", "modifier_user_id", "modifier_user_ip", "archived") VALUES ('PAYMENT_STATUS', 'payment status', 1, '127.0.0.1', null);

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('payment has successfully completed', true, 1, 'COMPLETED', 1, '127.0.0.1', null, 'Completed', (SELECT "id" FROM "classification_type" WHERE "name"='PAYMENT_STATUS'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('payment has failed', true, 2, 'FAILED', 4, '127.0.0.1', null, 'Failed', (SELECT "id" FROM "classification_type" WHERE "name"='PAYMENT_STATUS'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('payment was rejected', true, 3, 'REJECTED', 3, '127.0.0.1', null, 'Rejected', (SELECT "id" FROM "classification_type" WHERE "name"='PAYMENT_STATUS'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('status is being processed', true, 4, 'PENDING', 2, '127.0.0.1', null, 'Pending', (SELECT "id" FROM "classification_type" WHERE "name"='PAYMENT_STATUS'), true, null);
END IF;

IF NOT EXISTS (SELECT * FROM "classification_type" WHERE "name" = 'MANUFACTURER') THEN
	INSERT INTO "classification_type" ("name", "description", "modifier_user_id", "modifier_user_ip", "archived") VALUES ('MANUFACTURER', 'cars manufacturer', 1, '127.0.0.1', null);

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 1, 'BMW', 1, '127.0.0.1', null, 'BMW', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 2, 'CHRYSLER', 1, '127.0.0.1', null, 'Chrysler', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 3, 'CITROEN', 1, '127.0.0.1', null, 'Citroen', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 4, 'FIAT', 1, '127.0.0.1', null, 'Fiat', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 5, 'FORD', 1, '127.0.0.1', null, 'Ford', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 6, 'HONDA', 1, '127.0.0.1', null, 'Honda', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 7, 'HYUNDAI', 1, '127.0.0.1', null, 'Hyundai', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 8, 'KIA', 1, '127.0.0.1', null, 'Kia', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 9, 'LEXUS', 1, '127.0.0.1', null, 'Lexus', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 10, 'MAZDA', 1, '127.0.0.1', null, 'Mazda', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 11, 'NISSAN', 1, '127.0.0.1', null, 'Nissan', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 12, 'OPEL', 1, '127.0.0.1', null, 'Opel', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 13, 'PEUGEOT', 1, '127.0.0.1', null, 'Peugeot', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 14, 'RENAULT', 1, '127.0.0.1', null, 'Renault', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 15, 'SEAT', 1, '127.0.0.1', null, 'Seat', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 16, 'SKODA', 1, '127.0.0.1', null, 'Škoda', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 17, 'SUBARU', 1, '127.0.0.1', null, 'Subaru', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 18, 'VOLKSWAGEN', 1, '127.0.0.1', null, 'Volkswagen', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 19, 'VOLVO', 1, '127.0.0.1', null, 'Volvo', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 20, 'PORSCHE', 1, '127.0.0.1', null, 'Porsche', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 21, 'FERRARI', 1, '127.0.0.1', null, 'Ferrari', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 22, 'JAGUAR', 1, '127.0.0.1', null, 'Jaguar', (SELECT "id" FROM "classification_type" WHERE "name"='MANUFACTURER'), true, null);
END IF;

IF NOT EXISTS (SELECT * FROM "classification_type" WHERE "name" = 'COLOR') THEN
	INSERT INTO "classification_type" ("name", "description", "modifier_user_id", "modifier_user_ip", "archived") VALUES ('COLOR', 'color', 1, '127.0.0.1', null);

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 1, '#EF1717', 1, '127.0.0.1', null, 'red', (SELECT "id" FROM "classification_type" WHERE "name"='COLOR'), true, 'RED');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 2, '#E87846', 1, '127.0.0.1', null, 'orange', (SELECT "id" FROM "classification_type" WHERE "name"='COLOR'), true, 'ORANGE');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 3, '#DECC44', 1, '127.0.0.1', null, 'yellow', (SELECT "id" FROM "classification_type" WHERE "name"='COLOR'), true, 'YELLOW');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 4, '#91DD59', 1, '127.0.0.1', null, 'green', (SELECT "id" FROM "classification_type" WHERE "name"='COLOR'), true, 'GREEN');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 5, '#3AC99D', 1, '127.0.0.1', null, 'green', (SELECT "id" FROM "classification_type" WHERE "name"='COLOR'), true, 'GREEN');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 6, '#44DE62', 1, '127.0.0.1', null, 'green', (SELECT "id" FROM "classification_type" WHERE "name"='COLOR'), true, 'GREEN');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 7, '#15A6DB', 1, '127.0.0.1', null, 'blue', (SELECT "id" FROM "classification_type" WHERE "name"='COLOR'), true, 'BLUE');
END IF;

IF NOT EXISTS (SELECT * FROM "classification_type" WHERE "name" = 'FUEL') THEN
	INSERT INTO "classification_type" ("name", "description", "modifier_user_id", "modifier_user_ip", "archived") VALUES ('FUEL', 'fuel type', 1, '127.0.0.1', null);

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 1, 'DIESEL', 1, '127.0.0.1', null, 'Diesel', (SELECT "id" FROM "classification_type" WHERE "name"='FUEL'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 2, 'PETROL', 1, '127.0.0.1', null, 'Petrol', (SELECT "id" FROM "classification_type" WHERE "name"='FUEL'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 3, 'ELECTRIC', 1, '127.0.0.1', null, 'Electric', (SELECT "id" FROM "classification_type" WHERE "name"='FUEL'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 4, 'PLPG', 1, '127.0.0.1', null, 'Petrol + gas (LPG)', (SELECT "id" FROM "classification_type" WHERE "name"='FUEL'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 5, 'PCNG', 1, '127.0.0.1', null, 'Petrol + gas (CNG)', (SELECT "id" FROM "classification_type" WHERE "name"='FUEL'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 6, 'LPG', 1, '127.0.0.1', null, 'Gas (LPG)', (SELECT "id" FROM "classification_type" WHERE "name"='FUEL'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 7, 'CNG', 1, '127.0.0.1', null, 'Gas (CNG)', (SELECT "id" FROM "classification_type" WHERE "name"='FUEL'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 8, 'HYBRID', 1, '127.0.0.1', null, 'Hybrid', (SELECT "id" FROM "classification_type" WHERE "name"='FUEL'), true, null);
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('', true, 9, 'ETHANOL', 1, '127.0.0.1', null, 'Ethanol', (SELECT "id" FROM "classification_type" WHERE "name"='FUEL'), true, null);
END IF;

IF NOT EXISTS (SELECT * FROM "classification_type" WHERE "name" = 'VEHICLE_BODY') THEN
	INSERT INTO "classification_type" ("name", "description", "modifier_user_id", "modifier_user_ip", "archived") VALUES ('VEHICLE_BODY', 'vehicle body type', 1, '127.0.0.1', null);

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('car', true, 1, 'SEDAN', 1, '127.0.0.1', null, 'Sedan', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'PASSANGER_CAR');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('car', true, 2, 'HATCHBACK', 1, '127.0.0.1', null, 'Hatchback', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'PASSANGER_CAR');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('car', true, 3, 'TOURING', 1, '127.0.0.1', null, 'Touring', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'PASSANGER_CAR');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('car', true, 4, 'MINIVAN', 1, '127.0.0.1', null, 'Minivan', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'PASSANGER_CAR');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('car', true, 5, 'COUPE', 1, '127.0.0.1', null, 'Coupe', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'PASSANGER_CAR');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('car', true, 6, 'CABRIOLET', 1, '127.0.0.1', null, 'Cabriolet', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'PASSANGER_CAR');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('car', true, 7, 'LIMOUSINE', 1, '127.0.0.1', null, 'Limousine', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'PASSANGER_CAR');

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('SUV', true, 1, 'TOURING', 1, '127.0.0.1', null, 'Limousine', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'SUV');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('SUV', true, 2, 'PICKUP', 1, '127.0.0.1', null, 'Pickup', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'SUV');

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('commercial vehicle', true, 1, 'SMALL_COMMERCIAL_VEHICLE', 1, '127.0.0.1', null, 'Small Commercial Vehicle', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'COMMERCIAL_VEHICLE');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('commercial vehicle', true, 2, 'COMMERCIAL_VEHICLE', 1, '127.0.0.1', null, 'Commercial Vehicle', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'COMMERCIAL_VEHICLE');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('commercial vehicle', true, 3, 'RIGID', 1, '127.0.0.1', null, 'Rigid', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'COMMERCIAL_VEHICLE');

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('truck', true, 1, 'SADDLE', 1, '127.0.0.1', null, 'Saddle', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'TRUCK');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('truck', true, 2, 'RIGID', 1, '127.0.0.1', null, 'Rigid', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'TRUCK');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('truck', true, 3, 'CHASSIS', 1, '127.0.0.1', null, 'Chassis', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'TRUCK');

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('motorcycle', true, 1, 'CLASSICAL', 1, '127.0.0.1', null, 'Classical motorcycle', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'MOTO');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('motorcycle', true, 2, 'SCOOTER', 1, '127.0.0.1', null, 'Scooter', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'MOTO');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('motorcycle', true, 3, 'MOPED', 1, '127.0.0.1', null, 'Moped', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'MOTO');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('motorcycle', true, 4, 'BIKE', 1, '127.0.0.1', null, 'Bike', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'MOTO');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('motorcycle', true, 5, 'CRUISERCHOPPER', 1, '127.0.0.1', null, 'Cruiser/Chopper', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'MOTO');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('motorcycle', true, 6, 'TOURING', 1, '127.0.0.1', null, 'Touring', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'MOTO');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('motorcycle', true, 7, 'MOTOCROSS', 1, '127.0.0.1', null, 'Motocross Bike', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'MOTO');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('motorcycle', true, 8, 'ENDURO', 1, '127.0.0.1', null, 'Enduro/Supermoto', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'MOTO');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('motorcycle', true, 9, 'TRIAL', 1, '127.0.0.1', null, 'Trial', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'MOTO');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('motorcycle', true, 10, 'ATV', 1, '127.0.0.1', null, 'ATV', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'MOTO');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('motorcycle', true, 11, 'BUGGY', 1, '127.0.0.1', null, 'Buggy', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'MOTO');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('motorcycle', true, 12, 'MOPEDCAR', 1, '127.0.0.1', null, 'Moped Car', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'MOTO');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('motorcycle', true, 13, 'OTHER', 1, '127.0.0.1', null, 'Other', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'MOTO');

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('water type', true, 1, 'MOTORBOAT', 1, '127.0.0.1', null, 'Launch/Motorboat', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'WATER_VEHICLE');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('water type', true, 2, 'YACHT', 1, '127.0.0.1', null, 'Yacht', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'WATER_VEHICLE');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('water type', true, 3, 'WATERSCOOTER', 1, '127.0.0.1', null, 'Waterscooter', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'WATER_VEHICLE');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('water type', true, 4, 'OTHER', 1, '127.0.0.1', null, 'Other', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'WATER_VEHICLE');

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('trailer type', true, 1, 'LIGHT', 1, '127.0.0.1', null, 'Light Trailer', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'TRAILER');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('trailer type', true, 2, 'SEMI', 1, '127.0.0.1', null, 'Semi-Trailer', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'TRAILER');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('trailer type', true, 3, 'TRAILER', 1, '127.0.0.1', null, 'Trailer', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'TRAILER');

	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('caravan type', true, 1, 'CARAVAN', 1, '127.0.0.1', null, 'Caravan', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'CARAVAN');
	INSERT INTO "classification" ("description", "is_imported", "weight", "value", "modifier_user_id", "modifier_user_ip", "archived", "name", "classification_type_id", "is_active", "value2")
	VALUES ('caravan type', true, 2, 'TRAILERTENT', 1, '127.0.0.1', null, 'Trailer Tent', (SELECT "id" FROM "classification_type" WHERE "name"='VEHICLE_BODY'), true, 'CARAVAN');
END IF;


END$$;









