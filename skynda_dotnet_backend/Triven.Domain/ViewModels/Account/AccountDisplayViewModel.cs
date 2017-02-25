using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace X3Project.Domain.ViewModels.Account
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
