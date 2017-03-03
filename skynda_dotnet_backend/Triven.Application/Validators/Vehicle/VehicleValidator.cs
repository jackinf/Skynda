using FluentValidation;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Validators.Vehicle
{
    public class VehicleValidator : AbstractValidator<VehicleAdminViewModel>
    {
        public VehicleValidator()
        {
            RuleFor(x => x.VinCode).NotEmpty();
            RuleFor(x => x.Price).NotEmpty();
            RuleFor(x => x.RegistrationNumber).NotEmpty();
            RuleFor(x => x.Mileage).NotEmpty();
            RuleFor(x => x.ColorOutsideHex).NotEmpty();
            RuleFor(x => x.MainImage).NotNull();
            RuleFor(x => x.Model).NotNull();
            RuleFor(x => x.Model.Id).NotNull().NotEmpty();
        }
    }
}