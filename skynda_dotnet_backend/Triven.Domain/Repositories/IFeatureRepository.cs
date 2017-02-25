using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.Repositories
{
    public interface IFeatureRepository<TFeatureEntity> : IBaseCrudRepository<TFeatureEntity>
        where TFeatureEntity : IFeature
    {
        IList<TFeatureEntity> GetAll(bool isActive = true);
        void DeleteEntity(int id, DeleteResponseViewModel response);
        TFeatureEntity Get(int id, bool isActive = true);        
        TFeatureEntity SaveOrUpdate(TFeatureEntity feature);
    }
}