using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories
{
    public interface IFeatureRepository<TFeatureEntity> : IBaseCrudRepository<TFeatureEntity> 
        where TFeatureEntity : IFeature
    {
    }
}