using System.ComponentModel.DataAnnotations.Schema;
using Triven.Domain.Models.Vehicle;

namespace Triven.Data.EntityFramework.Models.Vehicle
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
