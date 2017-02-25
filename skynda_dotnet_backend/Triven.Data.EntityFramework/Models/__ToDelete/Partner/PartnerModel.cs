using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Data.EntityFramework.Models.User;
using Triven.Data.EntityFramework.Models.Vehicle;
using Triven.Domain.Constants;
using Triven.Domain.Extensions;
using Triven.Domain.Models.Partner;

namespace Triven.Data.EntityFramework.Models.Partner
{
    [Table("Partner")]
    public class PartnerModel : AuditableModel, IPartnerModel
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
        public bool IsActive { get; set; }

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

        /// <summary>
        /// many-to-many realation to PartnerUsers
        /// </summary>
        public List<ApplicationUser> PartnerUsers { get; set; } = new List<ApplicationUser>();

        [InverseProperty("Partner")]
        public List<VehicleModel> Vehicles { get; set; } = new List<VehicleModel>();

        [InverseProperty("Partner")]
        public List<PartnerContactPersonModel> ContactPersons { get; set; } = new List<PartnerContactPersonModel>();

        [ForeignKey("User")]
        public int UserId_FK { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}