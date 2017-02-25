using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace X3Project.Domain.Validators
{
    public interface IValidatorCommand
    {
        void Validate(IdentityResult result);
    }
}
