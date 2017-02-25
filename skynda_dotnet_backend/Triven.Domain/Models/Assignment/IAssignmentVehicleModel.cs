using System;
using Triven.Domain.Constants;
using Triven.Domain.Models.Base;

namespace Triven.Domain.Models.Assignment
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
