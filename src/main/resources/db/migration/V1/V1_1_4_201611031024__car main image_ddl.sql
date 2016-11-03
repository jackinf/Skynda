ALTER TABLE public.cars_for_sale
   ADD COLUMN "main_image_url" character varying(255);
ALTER TABLE public.cars_for_sale
   ADD COLUMN "main_image_blob_name" character varying(50);
ALTER TABLE public.cars_for_sale
   ADD COLUMN "main_image_container_name" character varying(50);

ALTER TABLE public.car_fault
   ADD COLUMN "image_blob_name" character varying(50);
 ALTER TABLE public.car_fault
   ADD COLUMN "image_container_name" character varying(50);

ALTER TABLE public.car_image
   ADD COLUMN "image_blob_name" character varying(50);
ALTER TABLE public.car_image
   ADD COLUMN "image_container_name" character varying(50);