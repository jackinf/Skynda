using System.Text.RegularExpressions;
using FluentValidation;
using Triven.Domain.Repositories.Partner;

namespace Triven.Application.Validators.Partners
{
    public class PartnerRegisterValidator : AbstractValidator<PartnerModel>
    {
        private readonly IPartnerRepository<PartnerModel> _repository;

        public PartnerRegisterValidator(IPartnerRepository<PartnerModel> repository)
        {
            _repository = repository;

            RuleFor(partner => partner.CompanyName).NotEmpty().WithMessage("Company name is requierd");
            RuleFor(partner => partner.PrimaryPhone).NotEmpty().WithMessage("Phone number is requierd");
            RuleFor(partner => partner.VatNumber).NotEmpty().WithMessage("VAT number is requierd");
            RuleFor(partner => partner.VatNumber).Must(VatNumberNotExists).WithMessage("Vat number already exists");
            RuleFor(partner => partner.VatNumber).Must(VatNumberIsNotCorrect).WithMessage("Vat number doesn't conatin country code e.g FI1234567");
            RuleFor(partner => partner.Address).NotEmpty().WithMessage("Company address is requierd");
            RuleFor(partner => partner.ZipCode).NotEmpty().WithMessage("Zip code is requierd");
            RuleFor(partner => partner.Country).NotEmpty().WithMessage("Country is requierd");
            
        }

        /// <summary>
        /// Finds out if VAT number already exists
        /// </summary>
        /// <param name="vatNumber"></param>
        /// <returns></returns>
        private bool VatNumberNotExists(string vatNumber)
        {
            var result = _repository.GetByVat(vatNumber);
            if (result != null)
                return false;
            return true;
        }

        /// <summary>
        /// VAT number two first letters can't be numbers
        /// </summary>
        /// <param name="vatNumber"></param>
        /// <returns></returns>
        private bool VatNumberIsNotCorrect(string vatNumber)
        {
            if (string.IsNullOrEmpty(vatNumber))
                return false;
            var letters = vatNumber.Substring(0, 2);
            return Regex.IsMatch(letters, @"^[a-zA-Z]+$");
        }
    }
}
