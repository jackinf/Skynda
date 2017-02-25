using System;
using System.Collections.Generic;
using AutoMapper;
using CuttingEdge.Conditions;
using Microsoft.AspNet.Identity;
using Triven.Application.Results;
using Triven.Application.Validators.Partners;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.Constants;
using Triven.Domain.Repositories;
using Triven.Domain.Repositories.Partner;
using Triven.Domain.Services;
using Triven.Domain.ViewModelInterfaces;
using Triven.Domain.ViewModels.Account;
using Triven.Domain.ViewModels.Base;
using Triven.Domain.ViewModels.Partner;
using Triven.Domain.ViewModels.Partner.ContactPerson;
using Triven.Domain.ViewModels.Partner.Vehicle;

namespace Triven.Application.Services
{
    // ReSharper disable once ClassNeverInstantiated.Global
    public class PartnerService : IPartnerService<ServiceResult>
    {
        private readonly IPartnerRepository<PartnerModel> _partnerRepository;
        private IAccountRepository<ApplicationUser> _accountRepository;

        public PartnerService(IPartnerRepository<PartnerModel> partnerRepository)
        {
            _partnerRepository = partnerRepository;
            _accountRepository = IoC.Get<IAccountRepository<ApplicationUser>>();
        }

        public object UserManger { get; set; }

        // TODO: Think of a better way to get user manager
        public ApplicationUserManager GetUserManager()
        {
            var manager = UserManger as ApplicationUserManager;
            Condition.Ensures(manager).IsNotNull();
            return manager;
        }

        public ServiceResult GetAll<TPartnerViewModel>() where TPartnerViewModel : IPartnerViewModel
        {
            var entities = _partnerRepository.GetAll();
            var foundViewModels = Mapper.Map<IEnumerable<TPartnerViewModel>>(entities);
            return ServiceResult.Factory.Success(foundViewModels);
        }

        public ServiceResult Get<TPartnerViewModel>(int id) where TPartnerViewModel : IPartnerViewModel
        {
            var entity = _partnerRepository.Get(id);
            if (entity == null)
                ServiceResult.Factory.Fail(new List<string> { "Partner not found" });
            var foundViewModel = Mapper.Map<TPartnerViewModel>(entity);
            return ServiceResult.Factory.Success(foundViewModel);
        }

        /// <summary>
        /// Update the existing entity
        /// </summary>
        /// <typeparam name="TViewModel">Data, which we will put into entity for an update</typeparam>
        /// <param name="id">Entity to update</param>
        /// <param name="viewModel">Data for entity</param>
        /// <returns></returns>
        public ServiceResult Update<TViewModel>(int id, TViewModel viewModel) where TViewModel : IPartnerViewModel
        {
            var model = _partnerRepository.Get(id);
            if (model == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });
            Mapper.Map(viewModel, model);

            var validator = new PartnerPutValidator();
            var validation = validator.Validate(model);
            if (!validation.IsValid)
                return ServiceResult.Factory.Fail(validation);

            var updatedModel = _partnerRepository.Update(id, model);
            var resultViewModel = new BasicResponseViewModel();
            resultViewModel.Message = "Partner info update failed!";
            if (updatedModel.IsSuccess)
                resultViewModel.Message = "Partner info update succeeded!";
            return ServiceResult.Factory.Success(resultViewModel);
        }

        public ServiceResult Register(PartnerRegisterViewModel registerViewModel, string emailConfirmUrl)
        {
            var registerServiceResult = new ServiceResult();

            var partner = new PartnerModel();
            partner.PrimaryEmail = registerViewModel.Email;
            partner.PrimaryPhone = registerViewModel.ContactPhone;
            partner.CompanyName = registerViewModel.CompanyName;
            partner.VatNumber = registerViewModel.VatNumber;
            partner.Address = registerViewModel.CompanyAddress;
            partner.ZipCode = registerViewModel.ZipCode;
            partner.Country = registerViewModel.Country;
            partner.Status = PartnerStatus.WaitingConfirm;
            partner.IsActive = false;
            partner.CreatedOn = DateTime.Now;

            var validator = new PartnerRegisterValidator(_partnerRepository);
            var validation = validator.Validate(partner);
            if (!validation.IsValid)
                registerServiceResult.AddErrors(validation);

            ApplicationUser user;
            var userManger = GetUserManager();
            var existingUserId = registerViewModel.ExistingUserId;
            if (existingUserId != null && existingUserId > 0)
            {
                user = userManger.FindById(existingUserId.Value) as ApplicationUser;
                if (user == null)
                    return ServiceResult.Factory.Fail(new List<string> { $"User with id {existingUserId} was not found" });
            }
            else
            {
                var result = new AccountService(userManger).Register(registerViewModel.Email, registerViewModel.Password, registerViewModel.ConfirmPassword, null, null, Auth.Roles.Partner);
                if (!result.IsSuccessful)
                    registerServiceResult.AddErrors(result.Validation);
                registerServiceResult.IsSuccessful = result.IsSuccessful;
                if (!registerServiceResult.IsSuccessful)
                    return ServiceResult.Factory.Fail(registerServiceResult.Validation);
                user = result.Payload as ApplicationUser; // TODO: Avoid casting
                Condition.Ensures(user).IsNotNull(); // TODO: user is already created...
                existingUserId = user.Id;
            }

            //add partner role for user
            if (!userManger.IsInRole(user.Id, Auth.Roles.Partner.ToString()))
                userManger.AddToRole(user.Id, Auth.Roles.Partner.ToString());

            partner.UserId_FK = existingUserId.Value;
            partner.CreatedBy = existingUserId.Value;
            partner.UpdatedBy = existingUserId.Value;
            var partnerModelAddResult = _partnerRepository.Add(partner);
            //Let's send email Confirmation message
            if (partnerModelAddResult.IsSuccess)
            {
                var code = userManger.GenerateEmailConfirmationTokenAsync(user.Id);
                var callbackUrl = emailConfirmUrl.Replace("USERID", user.Id.ToString()).Replace("CODE", code.Result);

                userManger.SendEmailAsync(user.Id, "Confirm your account",
                    "Please confirm your account by clicking this link: <a href=\""
                    + callbackUrl + "\">link</a>");
            }
            return ServiceResult.Factory.Success(partnerModelAddResult.EntityId);
        }

        public ServiceResult UpdateStatus<TPartnerViewModel>(int id, TPartnerViewModel viewModel) where TPartnerViewModel : IPartnerViewModel
        {
            var model = _partnerRepository.Get(id);
            if (model == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });
            Mapper.Map(viewModel, model);

            var validator = new PartnerStatusPutValidator();
            var validation = validator.Validate(viewModel as PartnerStatusPutViewModel);
            if (!validation.IsValid)
                return ServiceResult.Factory.Fail(validation);

            var updatedModel = _partnerRepository.Update(id, model);
            var resultViewModel = new BasicResponseViewModel();
            resultViewModel.Message = "Partner status update failed!";
            if (updatedModel.IsSuccess)
                resultViewModel.Message = "Partner status update succeeded!";
            return ServiceResult.Factory.Success(resultViewModel);
        }
        
        public ServiceResult GetAllContactPersons<TPartnerContactViewModel>(int id) where TPartnerContactViewModel : IPartnerViewModel
        {
            var entity = _partnerRepository.Get(id);
            if (entity == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });
            var foundViewModel = Mapper.Map<IEnumerable<TPartnerContactViewModel>>(entity.ContactPersons.Where(x => x.Status != Status.Deleted));
            return ServiceResult.Factory.Success(foundViewModel);
        }

        public ServiceResult GetContactPerson<TPartnerContactViewModel>(int id, int contactPersonId) where TPartnerContactViewModel : IPartnerViewModel
        {
            var entity = _partnerRepository.Get(id);
            if (entity == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });
            var contactPerson = entity.ContactPersons.FirstOrDefault(person => person.Status != Status.Deleted && person.Id == contactPersonId);
            if (contactPerson == null)
                return ServiceResult.Factory.Fail(new List<string> { "Contact person not found" });

            var foundViewModel = Mapper.Map<TPartnerContactViewModel>(contactPerson);
            return ServiceResult.Factory.Success(foundViewModel);
        }

        public ServiceResult AddContactPerson(int id, PartnerContactPersonDisplayViewModel viewModel) 
        {
            viewModel = viewModel ?? new PartnerContactPersonDisplayViewModel();

            var entity = _partnerRepository.Get(id);
            if (entity == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });
            var validator = new PartnerContactPersonPutValidator();
            var validation = validator.Validate(viewModel);
            if (!validation.IsValid)
                return ServiceResult.Factory.Fail(validation);
            var contactPersonModal = new PartnerContactPersonModel()
            {
                Status = Status.Active,
                CreatedOn = DateTime.Now
            };
            Mapper.Map(viewModel, contactPersonModal);

            var contactPersonInfo = new PartnerContactPersonContactInfoModel();
            Mapper.Map(viewModel.ContactInfos[0], contactPersonInfo);
            contactPersonModal.ContactInfos.Add(contactPersonInfo);

            if (entity.ContactPersons == null)
                entity.ContactPersons = new List<PartnerContactPersonModel>();
            entity.ContactPersons.Add(contactPersonModal);
            _partnerRepository.Update(id, entity);

            return ServiceResult.Factory.Success(entity.Id);
        }

        /// <summary>
        /// Update partner contact info
        /// </summary>
        /// <param name="id">Partner ID</param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        public ServiceResult UpdateContactPerson(int id, PartnerContactPersonDisplayViewModel viewModel)
        {
            var entity = _partnerRepository.Get(id);
            var updateViewModel = viewModel ?? new PartnerContactPersonDisplayViewModel();
            if (entity == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found or someting went wrong" });

            var validator = new PartnerContactPersonPutValidator();
            var validation = validator.Validate(viewModel);
            if (!validation.IsValid)
                return ServiceResult.Factory.Fail(validation);

            var contactPerson = entity.ContactPersons.FirstOrDefault(x => x.Id == updateViewModel.Id);
            if (contactPerson == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner contact person not found" });

            Mapper.Map(viewModel, contactPerson);

            PartnerContactPersonContactInfoModel contactPersonInfo = contactPerson.ContactInfos.First();
            Mapper.Map(updateViewModel.ContactInfos[0], contactPersonInfo);
            
            _partnerRepository.UpdateWithContactPersonInfo(id, entity);
            return ServiceResult.Factory.Success(id);
        }

        public ServiceResult DeleteContactPerson(int id, int contactPersonId)
        {
            var entity = _partnerRepository.Get(id);
            if (entity == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });

            var contactPerson = entity.ContactPersons.FirstOrDefault(x => x.Id == contactPersonId);
            if (contactPerson == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner contact person not found" });
            contactPerson.Status = Status.Deleted;
            _partnerRepository.Update(id, entity);
            return ServiceResult.Factory.Success("Partner contatct info remove succeeded");
        }

        public ServiceResult GetAllVehicles<TPartnerVehicleViewModel>(int id) where TPartnerVehicleViewModel : IPartnerViewModel
        {
            var entity = _partnerRepository.Get(id);
            if (entity == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });
            var foundViewModel = Mapper.Map<IEnumerable<TPartnerVehicleViewModel>>(entity.Vehicles.Where(x => x.Status != Status.Deleted));
            return ServiceResult.Factory.Success(foundViewModel);
        }

        public ServiceResult GetVehicle<TPartnerVehicleViewModel>(int id, int vehicleId) where TPartnerVehicleViewModel : IPartnerViewModel
        {
            var entity = _partnerRepository.Get(id);
            if (entity == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found or someting went wrong" });

            var vehicle = entity.Vehicles.FirstOrDefault(x => x.Id == vehicleId && x.Status != Status.Deleted) ??
                          new VehicleModel();
            var foundViewModel = Mapper.Map<TPartnerVehicleViewModel>(vehicle);
            return ServiceResult.Factory.Success(foundViewModel);
        }

        public ServiceResult AddVehicle(int id, PartnerVehicleDisplayViewModel viewModel)
        {
            if (viewModel == null)
                return ServiceResult.Factory.Fail(new List<string> { "Request data not found" });
            var entity = _partnerRepository.Get(id);
            if (entity == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });
            var validator = new PartnerVehiclePutValidator(entity);
            var validation = validator.Validate(viewModel);
            if (!validation.IsValid)
                return ServiceResult.Factory.Fail(validation);
            var model = new VehicleModel()
            {
                Status = Status.Active,
                CreatedOn = DateTime.Now
            };
            Mapper.Map(viewModel, model);
            model.Status = Status.Active;
            if (entity.Vehicles == null)
                entity.Vehicles = new List<VehicleModel>();
            entity.Vehicles.Add(model);
            _partnerRepository.Update(id, entity);

            return ServiceResult.Factory.Success(entity.Id);
        }

        public ServiceResult UpdateVehicle<TPartnerVehicleViewModel>(int id, int vehicleId, TPartnerVehicleViewModel viewModel) where TPartnerVehicleViewModel : IPartnerViewModel
        {
            var entity = _partnerRepository.Get(id);
            var updateViewModel = viewModel as PartnerVehicleDisplayViewModel;
            if (entity == null || updateViewModel == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found or someting went wrong" });

            var validator = new PartnerVehiclePutValidator(entity, vehicleId);
            var validation = validator.Validate(viewModel as PartnerVehicleDisplayViewModel);
            if (!validation.IsValid)
                return ServiceResult.Factory.Fail(validation);

            var vehicle = entity.Vehicles.FirstOrDefault(x => x.Id == vehicleId);
            if (vehicle == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner vehicle not found" });
            Mapper.Map(viewModel, vehicle);
            _partnerRepository.Update(id, entity);
            return ServiceResult.Factory.Success(id);
        }

        public ServiceResult UpdateVehicleStatus<TPartnerVehicleViewModel>(int id, int vehicleId, TPartnerVehicleViewModel viewModel) where TPartnerVehicleViewModel : IPartnerViewModel
        {
            var model = _partnerRepository.Get(id);

            if (model == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });

            var vehicle = model.Vehicles.FirstOrDefault(x => x.Id == vehicleId);
            if (vehicle == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner vehicle not found" });

            Mapper.Map(viewModel, vehicle);

            var validator = new PartnerVehicleStatusValidator();
            var validation = validator.Validate(viewModel as PartnerStatusPutViewModel);
            if (!validation.IsValid)
                return ServiceResult.Factory.Fail(validation);

            var updatedModel = _partnerRepository.Update(id, model);
            var resultViewModel = new BasicResponseViewModel();
            resultViewModel.Message = updatedModel.IsSuccess
                ? "Partner vehicle status update succeeded!"
                : "Partner vehicle status update failed!";
            return ServiceResult.Factory.Success(resultViewModel);
        }

        public ServiceResult ActivatePartner(int id)
        {
            var model = _partnerRepository.GetWithUser(id);

            if (model == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });

            var validator = new PartnerActivationValidator();
            var validation = validator.Validate(model);
            if (!validation.IsValid)
                return ServiceResult.Factory.Fail(validation);

            model.Status = PartnerStatus.Active;
            model.IsActive = true;
            model.User.IsActive = true;
            model.User.Status = Status.Active;
            var updatedModel = _partnerRepository.Update(id, model);

            // Activate user too

            var resultViewModel = new BasicResponseViewModel();
            resultViewModel.Message = updatedModel.IsSuccess
                ? "Partner activation successful"
                : "Partner deactivation unsuccessful";

            return ServiceResult.Factory.Success(resultViewModel);
        }

        public ServiceResult DeactivatePartner(int id)
        {
            var model = _partnerRepository.GetWithUser(id);

            if (model == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });

            var validator = new PartnerDeactivationValidator();
            var validation = validator.Validate(model);
            if (!validation.IsValid)
                return ServiceResult.Factory.Fail(validation);

            model.Status = PartnerStatus.Deleted;
            model.IsActive = false;
            model.User.IsActive = false;
            model.User.Status = Status.Deleted;
            var updatedModel = _partnerRepository.Update(id, model);

            var resultViewModel = new BasicResponseViewModel();
            resultViewModel.Message = updatedModel.IsSuccess
                ? "Partner deactivation successful"
                : "Partner deactivation unsuccessful";

            return ServiceResult.Factory.Success(resultViewModel);
        }

        public ServiceResult GetAllPartnersUsers(int partnerId)
        {
            var partner = _partnerRepository.GetWithPartnersUsers(partnerId);
            if (partner == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });

            var applicationUsers = partner.PartnerUsers.ToList();
            var partnerContactPersonDisplayViewModels = Mapper.Map<List<AccountDisplayViewModel>>(applicationUsers);
            return ServiceResult.Factory.Success(partnerContactPersonDisplayViewModels);
        }

        public int CountAllWaitingConfirmationPartners() => _partnerRepository.CountAllWaitingConfirmationPartners();

        public ServiceResult AddPartnerUser(int partnerId, int userId)
        {
            var partner = _partnerRepository.GetWithPartnersUsers(partnerId);
            if (partner == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });

            var user = _accountRepository.Get(userId);
            if (user == null)
                return ServiceResult.Factory.Fail(new List<string> { "User not found" });

            if (partner.PartnerUsers.Any(x => x.Id == user.Id))
                return ServiceResult.Factory.Fail(new List<string> { "User already exists" });

            var success = _partnerRepository.AddPartnerUser(partner, user);
            if (!success)
                return ServiceResult.Factory.Fail(new List<string> { "User was not added to the partner" });

            return ServiceResult.Factory.Success(true);
        }

        public ServiceResult RemovePartnerUser(int partnerId, int userId)
        {
            var partner = _partnerRepository.GetWithPartnersUsers(partnerId);
            if (partner == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });

            var user = _accountRepository.Get(userId);
            if (user == null)
                return ServiceResult.Factory.Fail(new List<string> { "User not found" });

            if (partner.PartnerUsers.All(x => x.Id != user.Id))
                return ServiceResult.Factory.Fail(new List<string> { "User is not connected with the partner" });

            var success = _partnerRepository.RemovePartnerUser(partner, user);
            if (!success)
                return ServiceResult.Factory.Fail(new List<string> { "User was not added to the partner" });

            return ServiceResult.Factory.Success(true);
        }

        public ServiceResult DeleteVehicle(int id, int vehicleId)
        {
            var entity = _partnerRepository.Get(id);
            if (entity == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner not found" });

            var vehicle = entity.Vehicles.FirstOrDefault(x => x.Id == vehicleId);
            if (vehicle == null)
                return ServiceResult.Factory.Fail(new List<string> { "Partner vehicle not found" });
            vehicle.Status = Status.Deleted;
            _partnerRepository.Update(id, entity);
            return ServiceResult.Factory.Success(id,"Partner vehcile remove succeeded");
        }
    }
}