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
            /// Partner
            /// </summary>
            Partner,
            /// <summary>
            /// Normal user (partners users)
            /// </summary>
            User,
            /// <summary>
            /// Driver 
            /// </summary>
            Driver
        }
    }
}
