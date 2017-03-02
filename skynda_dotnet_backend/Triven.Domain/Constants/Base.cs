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
    }

    public static class AppSettings
    {
        public const string StorageConnectionString = "StorageConnectionString";
    }
}
