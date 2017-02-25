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
    public class PartnerVehicleStatusValidator : AbstractValidator<PartnerStatusPutViewModel>
    {
        public PartnerVehicleStatusValidator()
        {
            RuleFor(vehicle => vehicle.Status).NotEmpty().WithMessage("Status is requierd");
            RuleFor(vehicle => vehicle.Status).Must(IsNotValidStatus).WithMessage("Invalid status");
        }

        /// <summary>
        /// Is not valid status
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        private bool IsNotValidStatus(string status)
        {
            var result = Enum.IsDefined(typeof(Status),status);
            if (!result)
                return false;
            return true;
        }
    }
}
