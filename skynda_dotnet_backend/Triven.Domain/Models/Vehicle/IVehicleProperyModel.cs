using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Models.Base;

namespace X3Project.Domain.Models.Vehicle
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
