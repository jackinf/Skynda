using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Constants;
using Triven.Domain.Models.Driver;

namespace Triven.Data.EntityFramework.Models.Driver
{

    [Table("Driver")]
    public class DriverModel : AuditableModel, IDriverModel
    {
        [Required]
        public string FistName { get; set; }
        public string LastName { get; set; }
        public string DrivingLicenseNr { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public decimal Rating { get; set; }

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
