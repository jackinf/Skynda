using X3Project.Domain.ViewModels;

namespace X3Project.Domain.ViewModels.Partner
{
    public class PartnerRegisterViewModel : IPartnerViewModel
    {
        public string CompanyName { get; set; }
        public string Country { get; set; }
        //public string CEO { get; set; }
       // public string ContactPerson { get; set; }
        public string ContactPhone { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public string VatNumber { get; set; }
        public string CompanyAddress { get; set; }
        public string ZipCode { get; set; }
        //public string FirstName { get; set; }
        //public string LastName { get; set; }
        public int? ExistingUserId { get; set; }
    }
}
