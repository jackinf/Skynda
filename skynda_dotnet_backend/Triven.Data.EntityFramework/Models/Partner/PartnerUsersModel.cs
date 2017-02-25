using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using X3Project.Data.EntityFramework.Models.User;
using X3Project.Domain.Models.Partner;

namespace X3Project.Data.EntityFramework.Models.Partner
{
    [Table("PartnerUsers")]
    public class PartnerUsersModel : IPartnerUsersModel
    {
        [Key]
        [Column(Order = 0)]
        [ForeignKey("Partner")]
        public int PartnerId_FK { get; set; }

        [Key]
        [Column(Order = 1)]
        [ForeignKey("ApplicationUser")]
        public int UserId_FK { get; set; }

        [Required]
        public virtual ApplicationUser ApplicationUser { get; set; }
        [Required]
        public virtual PartnerModel Partner { get; set; }
    }
}
