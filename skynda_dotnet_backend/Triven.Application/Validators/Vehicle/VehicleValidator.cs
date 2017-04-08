using System;
using FluentValidation;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Validators.Vehicle
{
    public class VehicleValidator : AbstractValidator<VehicleAdminViewModel>
    {
        public VehicleValidator()
        {
            RuleFor(x => x.MainImage).NotEmpty().WithMessage("MainImage is required");

            RuleFor(x => x.VehicleModel).NotEmpty().WithMessage("VehicleModel is required");

            RuleFor(x => x.Price).NotEmpty().WithMessage("Price is required");

            RuleFor(x => x.Mileage).NotEmpty().WithMessage("Mileage is required");

            RuleFor(x => x.VinCode).NotEmpty().WithMessage("Vin Code is required");

            RuleFor(x => x.RegistrationNumber).NotEmpty().WithMessage("RegistrationNumber is required");

            RuleFor(x => x.ColorOutsideHex).NotEmpty().WithMessage("ColorOutsideHex is required");

            RuleFor(x => x.Engine).NotEmpty();

            RuleFor(x => x.HorsePower).NotNull().GreaterThan(0);

            var yearNow = DateTime.Now.Year;
            RuleFor(x => x.Year).NotNull().GreaterThanOrEqualTo(yearNow - 12).LessThanOrEqualTo(yearNow);

            RuleFor(x => x.FuelTypeId).NotNull().GreaterThan(0);

            RuleFor(x => x.TransmissionId).NotNull().GreaterThan(0);

            RuleFor(x => x.SafetyStars).GreaterThanOrEqualTo(0).LessThanOrEqualTo(5);
            RuleFor(x => x.HorsePower).GreaterThanOrEqualTo(0).LessThanOrEqualTo(500);
            RuleFor(x => x.FuelCity).GreaterThanOrEqualTo(0).LessThanOrEqualTo(25);
            RuleFor(x => x.Price).GreaterThanOrEqualTo(0).LessThanOrEqualTo(1000000);
        }
    }
}