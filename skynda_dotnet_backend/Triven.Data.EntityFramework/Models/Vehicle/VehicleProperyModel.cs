using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Models.Assignment;
using X3Project.Domain.Models.Vehicle;

namespace X3Project.Data.EntityFramework.Models.Vehicle
{

    [Table("VehiclePropery")]
    public class VehicleProperyModel : IVehicleProperyModel
    {
        public int Id { get; set; }

        [ForeignKey("Vehicle")]
        public int VechicleId_FK { get; set; }
        public virtual VehicleModel Vehicle { get; set; }

        public string Name { get; set; }
    }
}
