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
using X3Project.Domain.ViewModels.Partner.ContactPerson;

namespace X3Project.Application.Validators.Partners
{
    public class PartnerContactPersonPutValidator : AbstractValidator<PartnerContactPersonDisplayViewModel>
    {
        public PartnerContactPersonPutValidator()
        {
            RuleFor(partner => partner.FirstName).NotEmpty().WithMessage("First name is requierd");
            RuleFor(partner => partner.LastName).NotEmpty().WithMessage("Last name is requierd");
        }
    }
}
