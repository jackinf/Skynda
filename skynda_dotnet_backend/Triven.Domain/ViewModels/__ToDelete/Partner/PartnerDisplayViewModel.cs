using System.ComponentModel.DataAnnotations.Schema;
using Triven.Domain.Constants;
using Triven.Domain.Extensions;
using Triven.Domain.ViewModelInterfaces;

namespace Triven.Domain.ViewModels.Partner
{
    public class PartnerDisplayViewModel : IPartnerViewModel
    {
        public int Id { get; set; }
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

        /// <summary>
        /// Enum for DB as string
        /// </summary>
        [Column("Status")]
        public string StatusString
        {
            get { return Status.ToString(); }
            private set { Status = value.ParseEnum<PartnerStatus>(); }
        }

        [NotMapped]
        public PartnerStatus Status { get; set; }
    }
}
