using FluentValidation;
using Triven.Domain.ViewModels.Email;

namespace Triven.Application.Validators.Email
{
    public class EmailSubscriptionValidator : AbstractValidator<EmailSubscribeViewModel>
    {
        public EmailSubscriptionValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
        }
    }
}