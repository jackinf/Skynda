using FluentValidation;
using X3Project.Data.EntityFramework.Models.Partner;
using X3Project.Domain.Constants;
using X3Project.Domain.ViewModels.Partner;

namespace X3Project.Application.Validators.Partners
{
    public class PartnerActivationValidator : AbstractValidator<PartnerModel>
    {
        public PartnerActivationValidator()
        {
            RuleFor(vehicle => vehicle.Status).NotEqual(PartnerStatus.Active).WithMessage("Partner is already activated");
        }
    }
}