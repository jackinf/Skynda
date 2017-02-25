using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Data.EntityFramework.Models.Base;
using X3Project.Data.EntityFramework.Models.Partner;
using X3Project.Domain.Constants;
using X3Project.Domain.Extensions;
using X3Project.Domain.Models;
using X3Project.Domain.Models.Base;
using X3Project.Domain.Models.Partner;
using X3Project.Domain.Models.User;
using X3Project.Domain.Models.Vehicle;

namespace X3Project.Data.EntityFramework.Models.Vehicle
{
    [Table("Vehicle")]
    public class VehicleModel : AuditableModel, IVehicleModel
    {
        [ForeignKey("Partner")]
        public int PartnerId_FK { get; set; }
        public PartnerModel Partner { get; set; }

        public string RegNumber { get; set; }
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Enum for DB as string
        /// </summary>
        [Column("Type")]
        public string TypeString
        {
            get { return Type.ToString(); }
            private set { Type = value.ParseEnum<VehiceType>(); }
        }

        [NotMapped]
        public VehiceType Type { get; set; }

        public int EurClass { get; set; }
        public string RegistrationCountry { get; set; }
        public int PassengerCapacity { get; set; }
        public string LoadCapacity { get; set; }
        public decimal CargoLength { get; set; }
        public decimal CargoWidth { get; set; }
        public decimal CargoHeight { get; set; }
        public string BoxOrCurtain { get; set; }
        public bool SideOpen { get; set; }
        public bool RoofOpen { get; set; }
        public bool CoolType { get; set; }
        public bool TailLifter { get; set; }

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

        [InverseProperty("Vehicle")]
        private List<VehicleProperyModel> VehicleProperties { get; set; }
    }
}
