using System.Linq;
using X3Project.Data.EntityFramework.Repositories.Base;
using X3Project.Domain.Models.Classification;
using X3Project.Domain.Repositories.Classification;

namespace X3Project.Data.EntityFramework.Repositories
{
    public class ClassificationRepository : BaseCrudRepository<IClassificationModel>, IClassificationRepository
    {
        public IClassificationModel FindByName(string name)
        {
            return _context.Classification.FirstOrDefault(x => x.Name == name);
        }
    }
}
