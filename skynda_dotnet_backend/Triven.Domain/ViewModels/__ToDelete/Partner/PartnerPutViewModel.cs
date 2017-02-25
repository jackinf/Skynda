using Triven.Domain.ViewModelInterfaces;

namespace Triven.Domain.ViewModels.Partner
{
    public class PartnerPutViewModel : IPartnerViewModel
    {
        public string CompanyName { get; set; }
        public string VatNumber { get; set; }
        public string Address { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
        public string InvoicingAddress { get; set; }
        public string Iban { get; set; }
        public string Bic { get; set; }
        public string PrimaryEmail { get; set; }
        public string PrimaryPhone { get; set; }
    }
}
