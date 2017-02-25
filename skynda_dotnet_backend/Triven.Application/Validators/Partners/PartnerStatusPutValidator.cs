using System;
using FluentValidation;
using Triven.Domain.Constants;
using Triven.Domain.ViewModels.Partner;

namespace Triven.Application.Validators.Partners
{
    public class PartnerStatusPutValidator : AbstractValidator<PartnerStatusPutViewModel>
    {
        public PartnerStatusPutValidator()
        {
            RuleFor(partner => partner.Status).NotEmpty().WithMessage("Status is requierd");
            RuleFor(partner => partner.Status).Must(IsNotValidStatus).WithMessage("Invalid status");
        }

        /// <summary>
        /// Is not valid status
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        private bool IsNotValidStatus(string status)
        {
            var result = Enum.IsDefined(typeof(PartnerStatus),status);
            if (!result)
                return false;
            return true;
        }
    }
}
