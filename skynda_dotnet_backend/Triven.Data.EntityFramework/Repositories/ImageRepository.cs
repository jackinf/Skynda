using System.Collections.Generic;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class ImageRepository :  BaseCrudRepository<Image>, IImageRepository<Image>
    {
        public IList<Image> GetAllBy(string containerName)
        {
            using (var context = new ApplicationDbContext())
                return BaseQuery(context).Where(x => x.ContainerName == containerName).ToList();
        }
    }
}