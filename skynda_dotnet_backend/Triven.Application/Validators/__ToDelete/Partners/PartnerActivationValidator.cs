using FluentValidation;
using Triven.Domain.Constants;

namespace Triven.Application.Validators.Partners
{
    public class PartnerActivationValidator : AbstractValidator<PartnerModel>
    {
        public PartnerActivationValidator()
        {
            RuleFor(vehicle => vehicle.Status).NotEqual(PartnerStatus.Active).WithMessage("Partner is already activated");
        }
    }
}