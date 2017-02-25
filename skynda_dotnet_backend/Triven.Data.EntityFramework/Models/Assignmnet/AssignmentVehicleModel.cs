using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Data.EntityFramework.Models.Driver;
using X3Project.Data.EntityFramework.Models.Vehicle;
using X3Project.Domain.Constants;
using X3Project.Domain.Extensions;
using X3Project.Domain.Models.Assignment;

namespace X3Project.Data.EntityFramework.Models.Assignmnet
{

    [Table("AssignmentVehicle")]
    public class AssignmentVehicleModel : IAssignmentVehicleModel
    {
        public int Id { get; set; }

        [ForeignKey("Assignment")]
        public int AssignmentId_FK { get; set; }
        public virtual AssignmentModel Assignment { get; set; }

        [ForeignKey("Vehicle")]
        public int VehicleId_FK { get; set; }
        public virtual VehicleModel Vehicle { get; set; }

        [ForeignKey("Driver")]
        public int DriverId_FK { get; set; }
        public virtual DriverModel Driver { get; set; }

        /// <summary>
        /// Enum for DB as string
        /// </summary>
        [Column("Status")]
        public string StatusString
        {
            get { return Status.ToString(); }
            private set { Status = value.ParseEnum<AssignmentVehicleStatus>(); }
        }

        [NotMapped]
        public AssignmentVehicleStatus Status { get; set; }

        public DateTime? UpdateOn { get; set; }
        public int? UpdatedBy { get; set; }
        public decimal Price { get; set; }
    }
}
