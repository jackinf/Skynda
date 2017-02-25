using FluentValidation;
using Triven.Data.EntityFramework.Models.Partner;

namespace Triven.Application.Validators.Partners
{
    public class PartnerPutValidator : AbstractValidator<PartnerModel>
    {
        public PartnerPutValidator()
        {
            RuleFor(partner => partner.PrimaryPhone).NotEmpty().WithMessage("Company phone is requierd");
            RuleFor(partner => partner.PrimaryEmail).NotEmpty().WithMessage("Company email is requierd");
            RuleFor(partner => partner.InvoicingAddress).NotEmpty().WithMessage("Company invoicing address is requierd");
            RuleFor(partner => partner.Address).NotEmpty().WithMessage("Company address is requierd");
            RuleFor(partner => partner.ZipCode).NotEmpty().WithMessage("Zip code is requierd");
            RuleFor(partner => partner.Country).NotNull().NotEmpty().WithMessage("Country is requierd");

        }
    }
}