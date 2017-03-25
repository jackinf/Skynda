using FluentValidation;
using Triven.Domain.ViewModels.Email;

namespace Triven.Application.Validators.Email
{
    public class EmailBaseValidator : AbstractValidator<EmailBaseViewModel>
    {
        public EmailBaseValidator()
        {
            RuleFor(x => x.GetSender()).EmailAddress();
            RuleFor(x => x.GetSubject()).NotEmpty();
            RuleFor(x => x.GetContent()).NotEmpty();
        }
    }
}