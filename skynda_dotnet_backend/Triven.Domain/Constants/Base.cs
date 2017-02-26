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

    public static class BaseConstants
    {

    }

    public static class DatabaseConstants
    {
        public static class ClassificationTypeName
        {
            public const string PAYMENT_TYPE = "PAYMENT_TYPE";
            public const string DRIVETRAIN = "DRIVETRAIN";
            public const string TRANSMISSION = "TRANSMISSION";
            public const string PAYMENT_STATUS = "PAYMENT_STATUS";
            public const string MANUFACTURER = "MANUFACTURER";
            public const string FUEL = "FUEL";
            public const string VEHICLE_BODY = "VEHICLE_BODY";
        }
    }

    public static class AppSettings
    {

    }
}
