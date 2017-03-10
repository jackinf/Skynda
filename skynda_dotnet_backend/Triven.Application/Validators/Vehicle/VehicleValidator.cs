using FluentValidation;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Validators.Vehicle
{
    public class VehicleValidator : AbstractValidator<VehicleAdminViewModel>
    {
        public VehicleValidator()
        {
            RuleFor(x => x.VinCode).NotNull().NotEmpty();
            RuleFor(x => x.Price).NotNull().NotEmpty();
            RuleFor(x => x.RegistrationNumber).NotNull().NotEmpty();
            RuleFor(x => x.Mileage).NotNull().NotEmpty();
            RuleFor(x => x.ColorOutsideHex).NotNull().NotEmpty();
            RuleFor(x => x.MainImage).NotNull();
            RuleFor(x => x.Model).NotNull();
            RuleFor(x => x.Model.Id).NotNull().NotEmpty();
        }
    }
}