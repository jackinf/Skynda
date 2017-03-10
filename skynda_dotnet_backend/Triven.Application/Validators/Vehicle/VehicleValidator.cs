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

        }
    }
}