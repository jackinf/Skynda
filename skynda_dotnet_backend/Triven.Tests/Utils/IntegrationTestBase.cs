using System.ComponentModel;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using NUnit.Framework;
using Triven.Application;
using Triven.Data.EntityFramework;
using Triven.Data.EntityFramework.Migrations;

namespace Triven.Tests.Utils
{
    public abstract class IntegrationTestBase
    {
        protected Container Container { get; private set; }
        protected ApplicationDbContext Context { get; private set; }
        
        [OneTimeSetUp]
        public void OneTimeSetUp()
        {
            Initializer.Initialize();

            Context = ApplicationDbContext.Create();
            //Context.Database.Delete();    // TODO: tegelt pole ju vajadust andmebaasi kustutada enne teste?.. vajadusel saame ClearTable-tega tabelid tühjaks lasta
            Context.Database.CreateIfNotExists();
            var configuration = new Configuration();
            var migrator = new DbMigrator(configuration);
            migrator.Update();
        }

        [OneTimeTearDown]
        public void OneTimeTearDown()
        {
        }

        public static void ClearTable<T>(DbSet<T> dbSet) where T : class
        {
            dbSet.RemoveRange(dbSet);
        }

        public static void ClearTableAndApply<T>(DbSet<T> dbSet, ApplicationDbContext Context) where T : class
        {
            dbSet.RemoveRange(dbSet);
            Context.SaveChanges();
        }
    }
}