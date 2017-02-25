using System;
using FluentValidation;
using Triven.Domain.Constants;
using Triven.Domain.ViewModels.Partner;

namespace Triven.Application.Validators.Partners
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
