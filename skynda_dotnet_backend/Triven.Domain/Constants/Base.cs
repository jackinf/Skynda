namespace Triven.Domain.Constants
{    
    public enum Language
    {
        /// <summary>
        /// English
        /// </summary>
        en,
        /// <summary>
        /// Finnish
        /// </summary>
        fi,
        /// <summary>
        /// Swedish
        /// </summary>
        se
    }

    public static class Constants
    {

    }

    public static class DatabaseConstants
    {
        public static class ClassificationTypeName
        {
            public const string PaymentType = "PAYMENT_TYPE";
            public const string Drivetrain = "DRIVETRAIN";
            public const string Transmission = "TRANSMISSION";
            public const string PaymentStatus = "PAYMENT_STATUS";
            public const string Manufacturer = "MANUFACTURER";
            public const string Fuel = "FUEL";
            public const string VehicleBody = "VEHICLE_BODY";
        }

        public static class ClassificationTypeId
        {
            public const int PaymentTypeId = 1;
            public const int DrivetrainTypeId = 2;
            public const int TransmissionTypeId = 3;
            public const int PaymentStatusTypeId = 4;
            public const int ManufacturerTypeId = 5;
            public const int FuelTypeId = 6;
            public const int VehicleBodyTypeId = 7;
        }

        public static class ClassificationIds
        {
            public static class PaymentType
            {
                // TODO
            }

            public static class Drivetrain
            {
                // TODO
            }

            public static class TransmissionType
            {
                // TODO
            }

            public static class PaymentStatusType
            {
                // TODO
            }

            public static class ManufacturerType
            {
                // TODO
            }

            public static class FuelType
            {
                // TODO
            }

            public static class VehicleBodyType
            {
                // TODO
            }

        }
    }

    public static class AppSettings
    {
        public const string StorageConnectionString = "StorageConnectionString";
    }
}
