using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using X3Project.Data.EntityFramework.Models.Partner;
using X3Project.Domain.Constants;
using X3Project.Domain.Extensions;
using X3Project.Domain.ViewModels.Partner;

namespace X3Project.Application.Validators.Partners
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
