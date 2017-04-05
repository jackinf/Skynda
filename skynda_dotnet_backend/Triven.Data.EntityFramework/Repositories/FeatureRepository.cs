using System.Collections.Generic;
using System.Linq;
using Triven.Data.EntityFramework.Entities;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class FeatureRepository : BaseCrudRepository<Feature>, IFeatureRepository<Feature>
    {
    }
}