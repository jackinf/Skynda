using System.Collections.Generic;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Models.Classification;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class ClassificationRepository : BaseCrudRepository<Classification>, IClassificationRepository<Classification>
    {
        public IClassificationModel FindByName(string name)
        {
            return _context.Classification.FirstOrDefault(x => x.Name == name);
        }

        public IList<Classification> GetByType(string type)
        {
            throw new System.NotImplementedException();
        }

        public IList<Classification> GetByTypeAndVehicleBound(string type)
        {
            throw new System.NotImplementedException();
        }
    }
}
