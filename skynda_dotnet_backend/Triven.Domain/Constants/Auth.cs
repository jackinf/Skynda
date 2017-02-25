using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace X3Project.Domain.Constants
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
