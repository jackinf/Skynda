using Microsoft.AspNet.Identity;

namespace Triven.Domain.Validators
{
    public interface IValidatorCommand
    {
        void Validate(IdentityResult result);
    }
}
