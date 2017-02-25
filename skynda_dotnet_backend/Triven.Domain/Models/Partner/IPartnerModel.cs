using X3Project.Domain.Constants;
using X3Project.Domain.Models.Base;

namespace X3Project.Domain.Models.Partner
{
    public interface IPartnerModel : IAuditableBaseModel
    {
        /// <summary>
        /// Company Name
        /// </summary>
        string CompanyName { get; set; }

        /// <summary>
        /// VAT number
        /// </summary>
        string VatNumber { get; set; }

        /// <summary>
        /// Address
        /// </summary>
        string Address { get; set; }

        /// <summary>
        /// Zip code
        /// </summary>
        string ZipCode { get; set; }

        /// <summary>
        /// Country
        /// </summary>
        string Country { get; set; }

        /// <summary>
        /// Invoicing address
        /// </summary>
        string InvoicingAddress { get; set; }

        /// <summary>
        /// IBAN number
        /// </summary>
        string Iban { get; set; }

        /// <summary>
        /// BIC number
        /// </summary>
        string Bic { get; set; }

        /// <summary>
        /// Partner primary email
        /// </summary>
        string PrimaryEmail { get; set; }

        /// <summary>
        /// Partner primary phone number
        /// </summary>
        string PrimaryPhone { get; set; }

        /// <summary>
        /// Partner account is active
        /// </summary>
        bool IsActive { get; set; }

        /// <summary>
        /// Partner account status
        /// </summary>
        PartnerStatus Status { get; set; }

        int UserId_FK { get; set; }
    }
}
