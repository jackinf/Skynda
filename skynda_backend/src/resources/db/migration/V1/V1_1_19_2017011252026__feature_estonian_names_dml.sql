DO LANGUAGE plpgsql $$
BEGIN

UPDATE classification SET  name = 'Katuseluuk' WHERE name = 'Sunroof'           ;
UPDATE classification SET  name = 'Immobilaiser' WHERE name = 'Immobilizer'      ;
UPDATE classification SET  name = 'Nahksisu' WHERE name = 'Leather Upholstery';
UPDATE classification SET  name = 'Istmesoojendus' WHERE name = 'Seat Heating'      ;
UPDATE classification SET  name = 'Roolivõim' WHERE name = 'Power Steering'    ;
UPDATE classification SET  name = 'Parkimissensor' WHERE name = 'Parking Sensors'   ;
UPDATE classification SET  name = 'Navigatsioon' WHERE name = 'Navigation xxx'    ;
UPDATE classification SET  name = 'Xenon tuled' WHERE name = 'Xenon Lights'      ;
UPDATE classification SET  name = 'Sportistmed' WHERE name = 'Racing Seats'      ;
UPDATE classification SET  name = 'Peeglisoojendus' WHERE name = 'Mirror Heating'    ;
UPDATE classification SET  name = 'Kiirusehoidja' WHERE name = 'Cruise Control'    ;
UPDATE classification SET  name = 'Bluetooth' WHERE name = 'Bluetooth'         ;
UPDATE classification SET name = 'Nupust käivitus' WHERE name = 'Keyless-Go';
UPDATE classification SET  name = 'Valuveljed' WHERE name = 'Alloy Wheels'      ;
UPDATE classification SET  name = 'Istmeventilatsioon' WHERE name = 'Ventilated Seats'  ;
UPDATE classification SET  name = 'Vihmasensor' WHERE name = 'Rain Sensors'     ;

END$$;

















