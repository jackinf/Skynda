using System.Data.Entity;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Diagnostics;
using Triven.Data.EntityFramework;

namespace Triven.Tests.Utils
{
    public class TestContextProvider
    {
        [DebuggerStepThrough]
        public TestContextProvider()
        {
            //string connectionString = BuildConnectionString().ConnectionString;
            Context = ApplicationDbContext.Create();
        }

        public DbContext Context { get; set; }

        //public int? CurrentUserId { get; }

        //[DebuggerStepThrough]
        //private EntityConnectionStringBuilder BuildConnectionString()
        //{
        //    //Build an SQL connection string
        //    SqlConnectionStringBuilder sqlString = new SqlConnectionStringBuilder()
        //    {
        //        // TODO: To config
        //        DataSource = "185.68.208.41",
        //        InitialCatalog = "EmrTest2",
        //        UserID = "emr_test",
        //        Password = "fErf_32F",

        //        MultipleActiveResultSets = true,
        //        IntegratedSecurity = false,
        //        ApplicationName = "EntityFramework"
        //    };

        //    //Build an Entity Framework connection string
        //    EntityConnectionStringBuilder entityString = new EntityConnectionStringBuilder()
        //    {
        //        Provider = "System.Data.SqlClient",
        //        Metadata = "res://*/eMR.csdl|res://*/eMR.ssdl|res://*/eMR.msl",
        //        ProviderConnectionString = sqlString.ToString()
        //    };
        //    return entityString;
        //}
    }
}