using Triven.Domain.Models.Base;

namespace Triven.Domain.Models.Vehicle
{
    public interface IVehicleProperyModel : IBaseModel
    {
        /// <summary>
        /// Vechicle Id
        /// </summary>
        int VechicleId_FK { get; set; }

        /// <summary>
        /// Property name
        /// </summary>
        string Name { get; set; }

        //IVehicleModel Vehicle { get; set; }
    }
}
