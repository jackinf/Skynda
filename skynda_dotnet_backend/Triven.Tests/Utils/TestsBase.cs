using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Diagnostics;
using System.Reflection;
using System.Web.UI.WebControls;
using NUnit.Framework;
using Triven.Application;
using Triven.Data.EntityFramework;
using Triven.Data.EntityFramework.Migrations;
using Triven.Data.EntityFramework.Models;
using Triven.FunctionalTests.Utils.EntityHelpers;

namespace Triven.FunctionalTests.Utils
{
    public abstract class TestsBase
    {
        //protected Container Container { get; private set; }
        //protected ApplicationDbContext Context { get; private set; }

        [OneTimeSetUp]
        public void OneTimeSetUp()
        {
            Initializer.Initialize();

            //Context = ApplicationDbContext.Create();
            //Context.Database.Delete();    // TODO: tegelt pole ju vajadust andmebaasi kustutada enne teste?.. vajadusel saame ClearTable-tega tabelid tühjaks lasta
            //Context.Database.CreateIfNotExists();
            var configuration = new Configuration();
            var migrator = new DbMigrator(configuration);
            migrator.Update();
        }

        [OneTimeTearDown]
        public void OneTimeTearDown()
        {
        }

        protected ApplicationDbContext CreateContext() => EntityFrameworkTestHelper.CreateContext();

        protected static void ClearTable<T>(DbSet<T> dbSet) where T : class
        {
            dbSet.RemoveRange(dbSet);
        }

        protected static void ClearTableAndApply<T>(DbSet<T> dbSet, ApplicationDbContext Context) where T : class
        {
            dbSet.RemoveRange(dbSet);
            Context.SaveChanges();
        }
        
        protected void ClearAllTablesAndApply()
        {
            using (var context = CreateContext())
            {
                context.Database.Log = s => Debug.WriteLine(s);

                //context.Classifications.RemoveRange(context.Classifications);
                //context.ClassificationTypes.RemoveRange(context.ClassificationTypes);
                //context.Features.RemoveRange(context.Features);

                List<string> listOfTableNames = new List<string>
                {
                    "VehicleImage",
                    "VehicleDescription",
                    "VehicleReportItem",
                    "VehicleReport",
                    "VehicleFeature",
                    "VehicleFault",
                    "Vehicle",
                    "Image",
                    "VehicleModel",
                    "Subscription"
                };
                foreach (var tableName in listOfTableNames)
                {
                    context.Database.ExecuteSqlCommand("DELETE FROM [" + tableName + "]");
                }

                //context.VehicleImages.RemoveRange(context.VehicleImages);
                //context.VehicleDescriptions.RemoveRange(context.VehicleDescriptions);
                //context.Vehicles.RemoveRange(context.Vehicles);
                //context.Images.RemoveRange(context.Images);
                //context.VehicleReportItems.RemoveRange(context.VehicleReportItems);
                //context.VehicleReports.RemoveRange(context.VehicleReports);
                //context.VehicleReviews.RemoveRange(context.VehicleReviews);
                //context.VehicleFeatures.RemoveRange(context.VehicleFeatures);
                //context.VehicleFaults.RemoveRange(context.VehicleFaults);
                //context.SaveChanges();
                //context.VehicleModels.RemoveRange(context.VehicleModels);
                //context.Subscriptions.RemoveRange(context.Subscriptions);
                //context.SaveChanges();
            }
        }

        protected T GetFromDbStrict<T>(int id) where T : class
        {
            using (var context = CreateContext())
            {
                var item = context.Set<T>().Find(id);
                Assert.IsNotNull("Item should exist");
                return item;
            }
        } 

        protected T GetFromDb<T>(int id) where T : class
        {
            using (var context = CreateContext())
                return context.Set<T>().Find(id);
        } 
    }
}