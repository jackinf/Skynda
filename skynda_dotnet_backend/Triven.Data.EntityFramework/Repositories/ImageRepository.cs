using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class ImageRepository :  BaseCrudRepository<Image>, IImageRepository<Image>
    {
        
    }
}