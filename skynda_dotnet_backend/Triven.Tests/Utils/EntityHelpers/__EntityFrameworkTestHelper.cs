using Triven.Data.EntityFramework;

namespace Triven.FunctionalTests.Utils.EntityHelpers
{
    internal static class EntityFrameworkTestHelper
    {
        public static ApplicationDbContext CreateContext() => new ApplicationDbContext();
    }
}