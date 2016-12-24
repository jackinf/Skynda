package me.skynda.classification.enums;

/**
 * Created by jevgenir on 12/17/2016.
 */
public enum ClassificationTypeEnum {
    FEATURE ("FEATURE", 1),
    PAYMENT_TYPE ("PAYMENT_TYPE", 2),
    DRIVETRAIN ("DRIVETRAIN", 3),
    TRANSMISSION ("TRANSMISSION", 4),
    PAYMENT_STATUS ("PAYMENT_STATUS", 5),
    MANUFACTURER ("MANUFACTURER", 6),
    COLOR ("COLOR", 7),
    FUEL ("FUEL", 8),
    VEHICLE_BODY ("VEHICLE_BODY", 9);

    private final String name;
    private final Integer value;

    ClassificationTypeEnum(String name, Integer value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return this.name;
    }

    public Integer getValue() {
        return this.value;
    }
}
