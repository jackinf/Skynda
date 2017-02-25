using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Models.Classification;
using X3Project.Domain.Repositories.Base;

namespace X3Project.Domain.Repositories.Classification
{
    public interface IClassificationRepository : IBaseCrudRepository<IClassificationModel>
    {
        IClassificationModel FindByName(string name);
    }
}
