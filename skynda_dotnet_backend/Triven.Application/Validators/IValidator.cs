using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using X3Project.Domain.Models.Base;

namespace X3Project.Application.Validators
{
    public interface IValidator <TAggregate> where TAggregate :IBaseModel
    {
        void Validate(IdentityResult result);
    }
}
