using FluentValidation;
using X3Project.Data.EntityFramework.Models.Partner;
using X3Project.Domain.Constants;

namespace X3Project.Application.Validators.Partners
{
    public class PartnerDeactivationValidator : AbstractValidator<PartnerModel>
    {
        public PartnerDeactivationValidator()
        {
            // TODO: ma ei saa mitte muhvigi aru :D
            //RuleFor(vehicle => vehicle.Status).Equal(PartnerStatus.Active).WithMessage("Partner is already deactivated");
            //RuleFor(vehicle => vehicle.IsActive).Equal(true).WithMessage("Partner is already deactivated");
        }
    }
}