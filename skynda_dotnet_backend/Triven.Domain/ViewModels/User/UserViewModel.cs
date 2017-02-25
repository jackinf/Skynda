using System;
using System.Collections.Generic;
using Triven.Domain.ViewModels.Authentication;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.User
{
    public class UserModel : BaseModel
    {
        public string Login { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public string Language { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Enabled { get; set; }
        public IList<AuthorityModel> Authority { get; set; }
    }
}