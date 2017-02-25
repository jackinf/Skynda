using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.Results;

namespace Triven.Domain.Repositories
{
    public interface IFeatureRepository<TFeatureEntity> : IBaseCrudRepository<TFeatureEntity>
        where TFeatureEntity : IFeature
    {
        IList<TFeatureEntity> GetAll(bool isActive = true);
        bool DeleteEntity(int id);
        TFeatureEntity Get(int id, bool isActive = true);        
        IResult<TFeatureEntity> SaveOrUpdate(TFeatureEntity feature);
    }
}