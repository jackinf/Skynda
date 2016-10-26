ALTER TABLE "cars_for_sale" ALTER COLUMN "images" DROP NOT NULL;
ALTER TABLE "cars_for_sale" ALTER COLUMN "mileage" TYPE DECIMAL(18,2) USING mileage::DECIMAL;