using FluentValidation;
using FluentValidation.Results;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Validators.VehicleReview
{
    public class VehicleReviewValidator : AbstractValidator<VehicleReviewViewModel>
    {
        public VehicleReviewValidator()
        {
            RuleFor(x => x.Rating).NotEmpty().GreaterThanOrEqualTo(0).LessThan(6);
            RuleFor(x => x.Text).NotEmpty();            
        }

        public override ValidationResult Validate(VehicleReviewViewModel instance)
        {
            if (!string.IsNullOrWhiteSpace(instance.LogoUrl))
            {
                
            }

            if (!string.IsNullOrWhiteSpace(instance.VideoUrl))
            {
                
            }


            return base.Validate(instance);
        }
    }
}