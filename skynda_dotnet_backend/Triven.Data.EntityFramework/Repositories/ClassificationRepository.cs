using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Models.Classification;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class ClassificationRepository : BaseCrudRepository<Classification>, IClassificationRepository<Classification>
    {
        public Classification FindByName(string name)
        {
            return BaseQuery().FirstOrDefault(x => x.Name == name);
        }

        public IList<Classification> GetByType(string type)
        {
            return BaseQuery().Include(x => x.ClassificationType).Where(x => x.ClassificationType.Name == type).ToList();
        }

        public IList<Classification> GetByTypeAndVehicleBound(string type)
        {
            throw new System.NotImplementedException();
        }
    }
}
