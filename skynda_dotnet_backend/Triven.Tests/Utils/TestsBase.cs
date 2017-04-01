﻿using System.ComponentModel;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using NUnit.Framework;
using Triven.Application;
using Triven.Data.EntityFramework;
using Triven.Data.EntityFramework.Migrations;
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
                //context.Classifications.RemoveRange(context.Classifications);
                //context.ClassificationTypes.RemoveRange(context.ClassificationTypes);
                context.Features.RemoveRange(context.Features);
                context.Images.RemoveRange(context.Images);
                context.Subscriptions.RemoveRange(context.Subscriptions);
                context.Vehicles.RemoveRange(context.Vehicles);
                context.VehicleDescriptions.RemoveRange(context.VehicleDescriptions);
                context.VehicleFaults.RemoveRange(context.VehicleFaults);
                context.VehicleFeatures.RemoveRange(context.VehicleFeatures);
                context.VehicleImages.RemoveRange(context.VehicleImages);
                context.VehicleModels.RemoveRange(context.VehicleModels);
                context.VehicleReports.RemoveRange(context.VehicleReports);
                context.VehicleReportItems.RemoveRange(context.VehicleReportItems);
                context.VehicleReviews.RemoveRange(context.VehicleReviews);
                context.SaveChanges();
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