using System.Linq;
using Triven.Data.EntityFramework.Entities;

namespace Triven.FunctionalTests.Utils.EntityHelpers
{
    internal static class FeatureUtils
    {
        public static Feature GetByValue(string value)
        {
            using (var context = EntityFrameworkTestHelper.CreateContext())
                return context.Features.Single(x => x.Value == value);
        }
    }
}