using System.Linq;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Models.Classification;
using Triven.Domain.Repositories.Classification;

namespace Triven.Data.EntityFramework.Repositories
{
    public class ClassificationRepository : BaseCrudRepository<IClassificationModel>, IClassificationRepository
    {
        public IClassificationModel FindByName(string name)
        {
            return _context.Classification.FirstOrDefault(x => x.Name == name);
        }
    }
}
