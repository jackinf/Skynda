using System.Collections.Generic;

namespace X3Project.Domain.ViewModels.Partner.ContactPerson
{
    public class PartnerContactPersonDisplayViewModel : IPartnerViewModel
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public bool IsCeo { get; set; }

        public string Job { get; set; }

        public List<PartnerContactPersonInfoDisplayViewModel> ContactInfos { get; set; } = new List<PartnerContactPersonInfoDisplayViewModel>();
    }
}
