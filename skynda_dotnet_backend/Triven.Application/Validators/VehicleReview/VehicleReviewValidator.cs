using FluentValidation;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Validators.VehicleReview
{
    public class VehicleReviewValidator : AbstractValidator<VehicleReviewViewModel>
    {
        public VehicleReviewValidator()
        {
            RuleFor(x => x.Rating).NotEmpty().GreaterThanOrEqualTo(0).LessThanOrEqualTo(5);
            RuleFor(x => x.Text).NotEmpty();                     
            RuleFor(x => x.LogoUrl).NotEmpty();                     
            RuleFor(x => x.VideoUrl).NotEmpty();                     
        }
    }
}