using FluentValidation;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Validators.VehicleReview
{
    public class VehicleReviewValidator : AbstractValidator<VehicleReviewViewModel>
    {
        public VehicleReviewValidator()
        {
            RuleFor(x => x.Rating).NotNull().NotEmpty().GreaterThanOrEqualTo(0).LessThanOrEqualTo(5);
            RuleFor(x => x.Text).NotNull().NotEmpty();            
            RuleFor(x => x.VideoUrl).NotNull().NotEmpty();            
            RuleFor(x => x.LogoUrl).NotNull().NotEmpty();            
        }
    }
}