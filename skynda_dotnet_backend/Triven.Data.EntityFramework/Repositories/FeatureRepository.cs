using System.Collections.Generic;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.Repositories.Partner;
using Triven.Domain.ViewModels.Common;

namespace Triven.Data.EntityFramework.Repositories
{
    public class FeatureRepository : BaseCrudRepository<Feature>, IFeatureRepository<Feature>
    {
        public IList<Feature> GetAll(bool isActive = true)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteEntity(Feature feature, DeleteResponseViewModel response)
        {
            throw new System.NotImplementedException();
        }

        public Feature Get(int id, bool isActive = true)
        {
            throw new System.NotImplementedException();
        }

        public Feature SaveOrUpdate(Feature feature)
        {
            throw new System.NotImplementedException();
        }

        public IList<Feature> GetAllBy(int vehicleId)
        {
            throw new System.NotImplementedException();
        }

        public IList<Feature> GetAllBy(int vehicleId, bool isActive)
        {
            throw new System.NotImplementedException();
        }
    }
}