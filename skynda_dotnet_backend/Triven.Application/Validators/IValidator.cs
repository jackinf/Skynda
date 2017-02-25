using Microsoft.AspNet.Identity;
using Triven.Domain.Models.Base;

namespace Triven.Application.Validators
{
    public interface IValidator <TAggregate> where TAggregate :IBaseModel
    {
        void Validate(IdentityResult result);
    }
}
