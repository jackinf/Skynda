using X3Project.Domain.Results;
using X3Project.Domain.ViewModels;
using X3Project.Domain.ViewModels.Partner;
using X3Project.Domain.ViewModels.Partner.ContactPerson;
using X3Project.Domain.ViewModels.Partner.Vehicle;

namespace X3Project.Domain.Services
{
    public interface IPartnerService<out TServiceResult> where TServiceResult : IServiceResult
    {
        // TODO: Think of a way to avoid "object"
        object UserManger { get; set; }

        /// <summary>
        /// "You should not place any of your mapping logic inside the service layer since it simply dosent belong there. Source http://stackoverflow.com/a/5613134/1635379"
        /// </summary>
        /// <returns></returns>
        TServiceResult Register(PartnerRegisterViewModel registerViewModel, string emailConfirmUrl);

        /// <summary>
        /// Get all the partners
        /// </summary>
        /// <typeparam name="TPartnerViewModel"></typeparam>
        /// <returns></returns>
        TServiceResult GetAll<TPartnerViewModel>() where TPartnerViewModel : IPartnerViewModel;

        /// <summary>
        /// Get single partner
        /// </summary>
        /// <typeparam name="TPartnerViewModel"></typeparam>
        /// <param name="id"></param>
        /// <returns></returns>
        TServiceResult Get<TPartnerViewModel>(int id) where TPartnerViewModel : IPartnerViewModel;

        /// <summary>
        /// Update a partner
        /// </summary>
        /// <typeparam name="TPartnerViewModel"></typeparam>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        TServiceResult Update<TPartnerViewModel>(int id, TPartnerViewModel viewModel) where TPartnerViewModel : IPartnerViewModel;

        /// <summary>
        /// Update a partner status
        /// </summary>
        /// <typeparam name="TPartnerViewModel"></typeparam>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        TServiceResult UpdateStatus<TPartnerViewModel>(int id, TPartnerViewModel viewModel) where TPartnerViewModel : IPartnerViewModel;

        /// <summary>
        /// Get all the partner contact persons
        /// </summary>
        /// <typeparam name="TPartnerContactViewModel"></typeparam>
        /// <returns></returns>
        TServiceResult GetAllContactPersons<TPartnerContactViewModel>(int id) where TPartnerContactViewModel : IPartnerViewModel;

        /// <summary>
        /// Get exact partner's contact persons
        /// </summary>
        /// <typeparam name="TPartnerContactViewModel"></typeparam>
        /// <returns></returns>
        TServiceResult GetContactPerson<TPartnerContactViewModel>(int id, int contactPersonId) where TPartnerContactViewModel : IPartnerViewModel;

        /// <summary>
        /// Add new partner contact person
        /// </summary>
        /// <returns></returns>
        TServiceResult AddContactPerson(int id, PartnerContactPersonDisplayViewModel viewModel);

        /// <summary>
        /// Update partner contact person
        /// </summary>
        /// <returns></returns>
        TServiceResult UpdateContactPerson(int id, PartnerContactPersonDisplayViewModel viewModel);

        /// <summary>
        /// Delete partner contact person
        /// </summary>
        /// <returns></returns>
        TServiceResult DeleteContactPerson(int id, int contactPersonId);

        /// <summary>
        /// Get all partner vehicles
        /// </summary>
        /// <typeparam name="TPartnerVehicleViewModel"></typeparam>
        /// <returns></returns>
        TServiceResult GetAllVehicles<TPartnerVehicleViewModel>(int id) where TPartnerVehicleViewModel : IPartnerViewModel;

        /// <summary>
        /// Get partner vehicle data
        /// </summary>
        /// <typeparam name="TPartnerVehicleViewModel"></typeparam>
        /// <returns></returns>
        TServiceResult GetVehicle<TPartnerVehicleViewModel>(int id, int partnerId) where TPartnerVehicleViewModel : IPartnerViewModel;

        
        /// <summary>
        /// Add new partner contact person
        /// </summary>
        /// <returns></returns>
        TServiceResult AddVehicle(int id, PartnerVehicleDisplayViewModel viewModel);

        /// <summary>
        /// Update partner vehicle
        /// </summary>
        /// <typeparam name="TPartnerVehicleViewModel"></typeparam>
        /// <returns></returns>
        TServiceResult UpdateVehicle<TPartnerVehicleViewModel>(int id, int vehicleId, TPartnerVehicleViewModel viewModel) where TPartnerVehicleViewModel : IPartnerViewModel;

        /// <summary>
        /// Update partner vehicle status
        /// </summary>
        /// <returns></returns>
        TServiceResult UpdateVehicleStatus<TPartnerVehicleViewModel>(int id, int vehicleId, TPartnerVehicleViewModel viewModel) where TPartnerVehicleViewModel: IPartnerViewModel;

        /// <summary>
        /// Delete partner vehicle
        /// </summary>
        /// <returns></returns>
        TServiceResult DeleteVehicle(int id, int vehicleId);

        /// <summary>
        /// Admin activates the partner so the activated partner can login
        /// </summary>
        /// <param name="id">Partner id</param>
        /// <returns>Service result</returns>
        TServiceResult ActivatePartner(int id);

        /// <summary>
        /// Admin deactivates the partner so the deactivated partner cannot login
        /// </summary>
        /// <param name="id">Partner id</param>
        /// <returns>Service result</returns>
        TServiceResult DeactivatePartner(int id);

        /// <summary>
        /// Get connected users to the partner
        /// </summary>
        /// <param name="partnerId">Partner id</param>
        /// <returns></returns>
        TServiceResult GetAllPartnersUsers(int partnerId);

        int CountAllWaitingConfirmationPartners();

        /// <summary>
        /// Connects the partner and the user
        /// </summary>
        /// <param name="partnerId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        TServiceResult AddPartnerUser(int partnerId, int userId);

        /// <summary>
        /// Disconnects the user from the partner
        /// </summary>
        /// <param name="partnerId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        TServiceResult RemovePartnerUser(int partnerId, int userId);
    }
}