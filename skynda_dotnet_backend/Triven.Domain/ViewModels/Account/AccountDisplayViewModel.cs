using System.Collections.Generic;

namespace Triven.Domain.ViewModels.Account
{
    public class AccountDisplayViewModel
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DefaultLanguage { get; set; }

        public List<AccountContactInfoDisplayModel> ContactInfos { get; set; } = new List<AccountContactInfoDisplayModel>();
    }
}
