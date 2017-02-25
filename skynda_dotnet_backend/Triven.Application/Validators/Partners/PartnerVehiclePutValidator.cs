using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using FluentValidation.Results;
using X3Project.Data.EntityFramework.Models.Partner;
using X3Project.Domain.Constants;
using X3Project.Domain.ViewModels.Partner.ContactPerson;
using X3Project.Domain.ViewModels.Partner.Vehicle;

namespace X3Project.Application.Validators.Partners
{
    public class PartnerVehiclePutValidator : AbstractValidator<PartnerVehicleDisplayViewModel>
    {
        private PartnerModel _partner;
        private int _vehicleId;

        public PartnerVehiclePutValidator(PartnerModel model, int vehicleId = 0)
        {
            _partner = model;
            _vehicleId = vehicleId;

            RuleFor(vehicle => vehicle.RegNumber).NotEmpty().WithMessage("Registration number is requierd");
            RuleFor(vehicle => vehicle.EurClass).NotEmpty().WithMessage("EUR class is requierd");
            RuleFor(vehicle => vehicle.EurClass).GreaterThan(2).WithMessage("EUR class number is wrong").LessThan(7).WithMessage("EUR class number is wrong");
            RuleFor(vehicle => vehicle.PhoneNumber).NotEmpty().WithMessage("Vehicle phone number is requierd");
            RuleFor(vehicle => vehicle.Type).Must(IsNotValidType).WithMessage("Invalid type");
            RuleFor(vehicle => vehicle.RegNumber).Must(RegNumberIsNotExists).WithMessage("Registration number already exists");

            RuleFor(vehicle => vehicle.LoadCapacity).NotEmpty().WithMessage("Load capacity is requierd");

            //Custom rules for vehicles
            Custom(vehicle => PassengerCapacityIsNotFilledForType(vehicle)
                ? new ValidationFailure(nameof(vehicle.PassengerCapacity), "Passenger capacity is requierd")
                : null);

            //Custom rules for vehicles
            Custom(vehicle => CargoSpaceIsNotFilled(vehicle)
                ? new ValidationFailure("CargoSpace", "Cargo space (length, width, height) is requierd")
                : null);
        }

        /// <summary>
        /// Is not valid status
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        private bool IsNotValidType(int type)
        {
            if (type == 0)
                return false;
            var result = Enum.IsDefined(typeof(VehiceType), type);
            if (!result)
                return false;
            return true;
        }

        /// <summary>
        /// Reg number is not exitst 
        /// </summary>
        /// <param name="regnumber"></param>
        /// <returns></returns>
        private bool RegNumberIsNotExists(string regnumber)
        {
            if (!string.IsNullOrEmpty(regnumber))
            {
                var exists = _partner.Vehicles.FirstOrDefault(x => x.RegNumber.ToLower() == regnumber.ToLower() && x.Status != Status.Deleted);
                if (
                    (exists != null && _vehicleId == 0)
                    || (exists != null && _vehicleId != 0 && exists.Id != _vehicleId))
                    return false;
            }
            return true;
        }

        /// <summary>
        /// Passenger capacity validation
        /// </summary>
        /// <param name="vehicle"></param>
        /// <returns></returns>
        private bool PassengerCapacityIsNotFilledForType(PartnerVehicleDisplayViewModel vehicle)
        {
            if (vehicle.Type == (int) VehiceType.Taxi && vehicle.PassengerCapacity == 0)
                return true;
            return false;
        }

        /// <summary>
        /// Cargo space validatior
        /// </summary>
        /// <param name="vehicle"></param>
        /// <returns></returns>
        private bool CargoSpaceIsNotFilled(PartnerVehicleDisplayViewModel vehicle)
        {
            if (vehicle.CargoHeight == 0 || vehicle.CargoWidth == 0 || vehicle.CargoLength == 0)
                return true;
            return false;
        }
    }
}
