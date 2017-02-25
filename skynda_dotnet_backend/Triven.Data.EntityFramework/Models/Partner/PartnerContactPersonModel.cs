using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Constants;
using Triven.Domain.Models.Partner;

namespace Triven.Data.EntityFramework.Models.Partner
{
    [Table("PartnerContactPerson")]
    public class PartnerContactPersonModel : AuditableModel, IPartnerContactPersonModel
    {

        [ForeignKey("Partner")]
        public int PartnerId_FK { get; set; }
        public virtual PartnerModel Partner { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public bool IsCeo { get; set; }
        public string Job { get; set; }

        [InverseProperty("PartnerContactPerson")]
        public List<PartnerContactPersonContactInfoModel> ContactInfos { get; set; } = new List<PartnerContactPersonContactInfoModel>();

        /// <summary>
        /// Enum for DB as string
        /// </summary>
        [Column("Status")]
        public string StatusString
        {
            get { return Status.ToString(); }
            private set { Status = value.ParseEnum<Status>(); }
        }

        [NotMapped]
        public Status Status { get; set; }


    }
}
