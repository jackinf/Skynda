using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Common;

namespace Triven.Data.EntityFramework.Repositories
{
    public class FeatureRepository : BaseCrudRepository<Feature>, IFeatureRepository<Feature>
    {
        public IList<Feature> GetAll(bool isActive = true)
        {
            return BaseQuery().ToList();
        }

        public bool DeleteEntity(int id)
        {
            return base.Delete(id);
        }

        public Feature Get(int id, bool isActive = true)
        {
            return BaseQuery().FirstOrDefault(x => x.Id == id);
        }

        public IResult<Feature> SaveOrUpdate(Feature feature)
        {
            return base.Update(feature.Id, feature);
        }
    }
}