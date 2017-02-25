using FluentValidation;
using Triven.Data.EntityFramework.Models.Partner;

namespace Triven.Application.Validators.Partners
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