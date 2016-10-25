ALTER TABLE public.cars_for_sale ALTER COLUMN images DROP NOT NULL;
ALTER TABLE public.cars_for_sale ALTER COLUMN mileage type decimal(10,0) using mileage::decimal;