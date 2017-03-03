using FluentValidation;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Validators.VehicleModel
{
    public class VehicleModelValidator : AbstractValidator<VehicleModelViewModel>
    {
        public VehicleModelValidator()
        {
            RuleFor(x => x.ModelCode).NotNull().NotEmpty();
            RuleFor(x => x.Title).NotNull().NotEmpty();
            RuleFor(x => x.Description).NotNull().NotEmpty();
            RuleFor(x => x.Doors).NotNull().NotEmpty();
            RuleFor(x => x.Seats).NotNull().NotEmpty();
            RuleFor(x => x.Engine).NotNull().NotEmpty();
            RuleFor(x => x.HorsePower).NotNull().NotEmpty();
            RuleFor(x => x.Drivetrain).NotNull().NotEmpty();
            RuleFor(x => x.FuelType).NotNull().NotEmpty();
            RuleFor(x => x.Transmission).NotNull().NotEmpty();
            RuleFor(x => x.VehicleBody).NotNull().NotEmpty();
            RuleFor(x => x.VehicleManufacturer).NotNull().NotEmpty();
        }
        
    }
}