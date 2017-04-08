using FluentValidation;

namespace Triven.Application.Validators.VehicleReport
{
    public class VehicleReportValidator : AbstractValidator<Data.EntityFramework.Entities.VehicleReport>
    {
        public VehicleReportValidator()
        {
            RuleFor(x => x.Title).NotNull().NotEmpty();
            RuleFor(x => x.Description).NotNull().NotEmpty();
        }
    }
}