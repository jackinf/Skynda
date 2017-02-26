using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Domain.Services
{
    public interface IVehicleService<out TResult> where TResult : IServiceResult
    {
        /**
    * Gets all data from the database
    *
    * @return all vehicles
    */
        TResult GetAll();

        /**
         * Adds new vehicle for sale
         *
         * @param vehicleAdminDto Added vehicle's dto
         * @return Response
         */
        TResult Create(VehicleAdminViewModel viewModel);

        /// <summary>
        /// Update a vehicle
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        TResult Update(int id, VehicleAdminViewModel viewModel);

        /**
         * Gets a single vehicle. Used for udpating a vehicle.
         *
         * @param id vehicle's id
         * @return single vehicle's dto
         */
        TResult Get(int id);

        /**
         * Gets a single vehicle. Used for displaying full info about the vehicle to the user
         *
         * @param id vehicle's id
         * @return single vehicle's dto
         */
        TResult GetDetailed(int id);

        /**
         * Delets a single vehicle
         *
         * @param id vehicle's id
         * @return Is the deletion successful or not
         */
        TResult Delete(int id);

        /**
         * Search vehicles. Used for displaying full info about the vehicle to the user
         *
         * @return search results
         * @params search params
         */
        TResult Search(SearchRequestViewModel parameters);
    }
}