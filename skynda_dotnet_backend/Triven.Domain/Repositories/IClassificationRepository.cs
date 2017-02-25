using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories
{
    public interface IClassificationRepository<TClassificationEntity> : IBaseCrudRepository<TClassificationEntity>
        where TClassificationEntity : IClassification
    {
        IList<TClassificationEntity> GetByType(string type);
        IList<TClassificationEntity> GetByTypeAndVehicleBound(string type);
    }
}