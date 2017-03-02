using FluentValidation;
using Triven.Domain.ViewModels.Feature;

namespace Triven.Application.Validators.Feature
{
    public class FeatureValidator : AbstractValidator<FeatureViewModel>
    {
        public FeatureValidator()
        {
            RuleFor(x => x.Name).NotNull().NotEmpty();
            RuleFor(x => x.Value).NotNull().NotEmpty();
        }
    }
}