using System.Collections.Generic;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Domain.Services
{
    public interface IVehicleService
    {
        /// <summary>
        /// Gets all data from the database
        /// </summary>
        /// <returns></returns>
        ServiceResult<IEnumerable<VehicleDetailedViewModel>> GetAll();

        /// <summary>
        ///  Gets a single vehicle. Used for udpating a vehicle.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResult<VehicleAdminViewModel> Get(int id);
        
        /**
         * Gets a single vehicle. Used for displaying full info about the vehicle to the user
         *
         * @param id vehicle's id
         * @return single vehicle's dto
         */
        ServiceResult<VehicleDetailedViewModel> GetDetailed(int id);

        /// <summary>
        /// Adds new vehicle for sale
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        ServiceResult<VehicleAdminViewModel> Create(VehicleAdminViewModel viewModel);

        /// <summary>
        /// Update a vehicle
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        ServiceResult<VehicleAdminViewModel> Update(int id, VehicleAdminViewModel viewModel);

        /// <summary>
        /// Delets a single vehicle
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResult<bool> Delete(int id);

        /// <summary>
        /// Search vehicles. Used for displaying full info about the vehicle to the user
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        ServiceResult<IList<VehicleDetailedViewModel>> Search(SearchRequestViewModel parameters);
    }
}