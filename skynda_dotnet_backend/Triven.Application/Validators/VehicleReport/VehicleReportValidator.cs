using FluentValidation;

namespace Triven.Application.Validators.VehicleReport
{
    public class VehicleReportValidator : AbstractValidator<Data.EntityFramework.Entities.VehicleReport>
    {
        public VehicleReportValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
        }
    }
}