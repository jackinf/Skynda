using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.ViewModels.Common;

namespace Triven.Data.EntityFramework.Repositories
{
    public class FeatureRepository : BaseCrudRepository<Feature>, IFeatureRepository<Feature>
    {
        public IList<Feature> GetAll(bool isActive = true)
        {
            return BaseQuery().ToList();
        }

        public void DeleteEntity(int id, DeleteResponseViewModel response)
        {
            var toDelete = BaseQuery().FirstOrDefault(x => x.Id == id);
            if (toDelete == null)
                throw new Exception("Sitt juhtus. Service, püüa mind.");
            toDelete.DeletedOn = DateTime.Now;
            _context.SaveChanges();
        }

        public Feature Get(int id, bool isActive = true)
        {
            return BaseQuery().FirstOrDefault(x => x.Id == id);
        }

        public Feature SaveOrUpdate(Feature feature)
        {
            _context.Entry(feature).State = EntityState.Modified;
            var chagnes = _context.SaveChanges();
            if (chagnes == 0)
                throw new Exception("No changes!");
            return feature;
        }
    }
}