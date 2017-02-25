using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Constants;
using X3Project.Domain.Models.Base;
using X3Project.Domain.Models.Driver;
using X3Project.Domain.Models.User;
using X3Project.Domain.Models.Vehicle;

namespace X3Project.Domain.Models.Assignment
{
    public interface IAssignmentVehicleModel : IBaseModel
    {
        /// <summary>
        /// Assignment ID
        /// </summary>
        int AssignmentId_FK { get; set; }

        /// <summary>
        /// Vehicle ID
        /// </summary>
        int VehicleId_FK { get; set; }

        /// <summary>
        /// Driver ID
        /// </summary>
        int DriverId_FK { get; set; }

        /// <summary>
        /// Assignment vehicle status
        /// </summary>
        AssignmentVehicleStatus Status { get; set; }

        /// <summary>
        /// When was updated
        /// </summary>
        DateTime? UpdateOn { get; set; }

        /// <summary>
        /// Who updated
        /// </summary>
        int? UpdatedBy { get; set; }

        /// <summary>
        /// What price were offerd
        /// </summary>
        decimal Price { get; set; }

        //IApplicationUser<IApplicationUserContactInfo> Modifier { get; set; }

        //IVehicleModel Vehicle { get; set; }

        //IAssignmentModel Assignment { get; set; }

        //IDriverModel Driver { get; set; }
    }
}
