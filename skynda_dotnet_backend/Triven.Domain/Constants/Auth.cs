namespace Triven.Domain.Constants
{
    public static partial class Auth
    {
        public enum Roles
        {
            /// <summary>
            /// Administrator
            /// </summary>
            Admin,

            /// <summary>
            /// Person, who uploads the vehicles
            /// </summary>
            VehicleManager,

            /// <summary>
            /// Normal user
            /// </summary>
            User
        }
    }
}
