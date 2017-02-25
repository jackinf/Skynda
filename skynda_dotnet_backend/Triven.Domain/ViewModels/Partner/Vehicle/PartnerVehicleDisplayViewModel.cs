using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Constants;
using X3Project.Domain.Extensions;

namespace X3Project.Domain.ViewModels.Partner.Vehicle
{
    public class PartnerVehicleDisplayViewModel : IPartnerViewModel
    {
        public int Id;
        public string RegNumber { get; set; }
        public string PhoneNumber { get; set; }
        public int Type { get; set; }
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
            private set { Status = value.ParseEnum<PartnerStatus>(); }
        }

        [NotMapped]
        public PartnerStatus Status { get; set; }
    }
}
