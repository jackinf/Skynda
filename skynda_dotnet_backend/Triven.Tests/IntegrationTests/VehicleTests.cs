using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.Data.EntityFramework.Entities;
using Triven.Domain.Enums;
using Triven.Domain.ViewModels.Feature;
using Triven.Domain.ViewModels.Image;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;
using Triven.FunctionalTests.Utils;
using Triven.FunctionalTests.Utils.EntityHelpers;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class VehicleTests : TestsBase
    {
        [DebuggerStepThrough]
        VehicleController NewController() => new VehicleController();

        [SetUp]
        public void SetUp() => ClearAllTablesAndApply();

        [Test]
        public void should_get_all()
        {
            //
            // ARRANGE
            //

            var vehicleModel1 = VehicleModelUtils.Create();
            var image1 = ImageUtils.Create();
            var vehicle1 = VehicleUtils.Create(vehicleModel1.Id, image1.Id);
            var vehicle2 = VehicleUtils.Create(vehicleModel1.Id, image1.Id);


            //
            // ACT
            //

            var results = NewController()
                .GetAll(new SearchRequestViewModel())
                .GetOkPayload<IEnumerable<VehicleCompactViewModel>>().ToList();

            //
            // ASSERT
            //

            Assert.AreEqual(2, results.Count);

            var firstItem = results.Single(x => x.Id == vehicle1.Id);
            var secondItem = results.Single(x => x.Id == vehicle2.Id);

            // TODO: Assert
        }

        [Test]
        public void should_get()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();

            //
            // ACT
            //

            var result = NewController().Get(vehicle1.Id).GetOkPayload<VehicleDetailedViewModel>();

            //
            // ASSERT
            //

            Assert.AreEqual(vehicle1.Id, result.Id);

            // TODO: Assert
        }

        [Test]
        public void should_get_detailed()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();

            //
            // ACT
            //

            var result = NewController().GetDetailed(vehicle1.Id).GetOkPayload<VehicleAdminViewModel>();

            //
            // ASSERT
            //

            Assert.AreEqual(vehicle1.Id, result.Id);

            // TODO: Assert
        }

        [Test]
        public void should_add()
        {
            //
            // ARRANGE
            //

            var vehicleModel1 = VehicleModelUtils.Create();
            var image1 = ImageUtils.Create();
            var feature1 = FeatureUtils.GetByValue("PARKING_SENSORS");
            var feature2 = FeatureUtils.GetByValue("BLUETOOTH");

            //
            // ACT
            //

            var mainImage = new ImageViewModel
            {
                Url = "http://www.google.com"
            };
            var vehicleModel = new VehicleModelViewModel { Id = vehicleModel1.Id };
            var selecedFeatures = new List<FeatureAdminSelectViewModel>
            {
                new FeatureAdminSelectViewModel {Id = feature1.Id},
                new FeatureAdminSelectViewModel {Id = feature2.Id}
            };
            var images = new List<VehicleImageViewModel>
            {
                new VehicleImageViewModel
                {
                    Image = new ImageViewModel
                    {
                        Id = image1.Id,
                        Url = image1.Url,
                        // TODO: Handle thumbnail url
                    }
                }
            };
            var descriptions = new List<VehicleDescriptionViewModel>
            {
                new VehicleDescriptionViewModel
                {
                    Title = Guid.NewGuid().ToString(),
                    Content = Guid.NewGuid().ToString()
                }
            };
            var requestParam = new VehicleAdminViewModel
            {
                VinCode = $"created_{Guid.NewGuid()}",
                Price = 10000,
                RegistrationNumber = $"created_{Guid.NewGuid()}",
                Mileage = 10001,
                ColorOutsideHex = $"created_{Guid.NewGuid()}",
                ColorInsideHex = $"created_{Guid.NewGuid()}",
                FuelCity = 1002,
                FuelHighway = 1003,
                CompressionRatio = 1004,
                CompressionType = $"created_{Guid.NewGuid()}",
                Configuration = $"created_{Guid.NewGuid()}",
                Cylinders = $"created_{Guid.NewGuid()}",
                Displacement = $"created_{Guid.NewGuid()}",
                Size = 8,
                Torque = 6,
                TotalValves = 7,
                SafetyUrl = $"created_{Guid.NewGuid()}",
                SafetyStars = 4,
                Additional = $"created_{Guid.NewGuid()}",

                MainImage = mainImage,
                VehicleModel = vehicleModel,
                FeaturesAdminSelect = selecedFeatures,
                Images = images,
                Descriptions = descriptions,
            };
            var result = NewController().Add(requestParam).GetOkPayload<VehicleAdminViewModel>();

            //
            // ASSERT
            //

            var fromDb = GetFromDbStrict<VehicleReport>(result.Id);

            // TODO: Assert
        }

        [Test]
        public void should_update()
        {
            //
            // ARRANGE
            //

            var vehicleModel1 = VehicleModelUtils.Create();
            var image1 = ImageUtils.Create();
            var vehicle1 = VehicleUtils.Create(vehicleModel1.Id, image1.Id,
                vinCode: $"created_{Guid.NewGuid()}",
                price: 1000,
                registrationNumber: $"created_{Guid.NewGuid()}",
                mileage: 2000,
                colorOutsideHex: $"created_{Guid.NewGuid()}",
                colorInsideHex: $"created_{Guid.NewGuid()}",
                fuelCity: 3000,
                fuelHighway: 4000,
                compressionRatio: 5000,
                compressionType: $"created_{Guid.NewGuid()}",
                configuration: $"created_{Guid.NewGuid()}",
                cylinders: $"created_{Guid.NewGuid()}",
                displacement: $"created_{Guid.NewGuid()}",
                size: 6000,
                torque: 7000,
                totalValves: 8000,
                safetystars: 5,
                safetyUrl: $"created_{Guid.NewGuid()}",
                additional: $"created_{Guid.NewGuid()}",
                vehicleStatus: VehicleStatus.Unpublished);
            var feature1 = FeatureUtils.GetByValue("PARKING_SENSORS");
            var feature2 = FeatureUtils.GetByValue("BLUETOOTH");

            //
            // ACT
            //

            var mainImage = new ImageViewModel
            {
                Url = "http://www.google.com"
            };
            var vehicleModel = new VehicleModelViewModel { Id = vehicleModel1.Id };
            var selecedFeatures = new List<FeatureAdminSelectViewModel>
            {
                new FeatureAdminSelectViewModel {Id = feature1.Id},
                new FeatureAdminSelectViewModel {Id = feature2.Id}
            };
            var images = new List<VehicleImageViewModel>
            {
                new VehicleImageViewModel
                {
                    Image = new ImageViewModel
                    {
                        Id = image1.Id,
                        Url = image1.Url,
                        // TODO: Handle thumbnail url
                    }
                }
            };
            var descriptions = new List<VehicleDescriptionViewModel>
            {
                new VehicleDescriptionViewModel
                {
                    Title = Guid.NewGuid().ToString(),
                    Content = Guid.NewGuid().ToString()
                }
            };
            var requestParam = new VehicleAdminViewModel
            {
                VinCode = $"updated_{Guid.NewGuid()}",
                Price = 10000,
                RegistrationNumber = $"updated_{Guid.NewGuid()}",
                Mileage = 10001,
                ColorOutsideHex = $"updated_{Guid.NewGuid()}",
                ColorInsideHex = $"updated_{Guid.NewGuid()}",
                FuelCity = 1002,
                FuelHighway = 1003,
                CompressionRatio = 1004,
                CompressionType = $"updated_{Guid.NewGuid()}",
                Configuration = $"updated_{Guid.NewGuid()}",
                Cylinders = $"updated_{Guid.NewGuid()}",
                Displacement = $"updated_{Guid.NewGuid()}",
                Size = 8,
                Torque = 6,
                TotalValves = 7,
                SafetyUrl = $"updated_{Guid.NewGuid()}",
                SafetyStars = 4,
                Additional = $"updated_{Guid.NewGuid()}",

                MainImage = mainImage,
                VehicleModel = vehicleModel,
                FeaturesAdminSelect = selecedFeatures,
                Images = images,
                Descriptions = descriptions
            };
            var result = NewController().Update(vehicle1.Id, requestParam).GetOkPayload<VehicleAdminViewModel>();

            //
            // ASSERT
            //

            // TODO: Assert
        }

        [Test]
        public void should_delete()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();

            //
            // ACT
            //

            var isSuccess = NewController().Delete(vehicle1.Id).GetOkPayload<bool>();

            //
            // ASSERT
            //

            Assert.IsTrue(isSuccess);
            var fromDb = GetFromDb<Vehicle>(vehicle1.Id);
            Assert.IsTrue(fromDb.DeletedOn.HasValue);

            // TODO: Assert
        }

        [Test]
        public void should_search()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();
            var vehicle2 = VehicleUtils.CreateWithVehicleModelAndImage();

            //
            // ACT
            //

            var requestParam = new SearchRequestViewModel();
            var items = NewController().Search(requestParam).GetOkPayload<IList<VehicleCompactViewModel>>();

            //
            // ASSERT
            //

            Assert.AreEqual(2, items.Count);

            // TODO: Assert
        }

        [Test]
        public void should_publish()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();

            //
            // ACT
            //

            var isSuccess = NewController().Publish(vehicle1.Id).GetOkPayload<bool>();

            //
            // ASSERT
            //

            Assert.IsTrue(isSuccess);
            var fromDb = GetFromDb<Vehicle>(vehicle1.Id);
            Assert.AreEqual(fromDb.VehicleStatus, VehicleStatus.Published);
        }

        [Test]
        public void should_unpublish()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();

            //
            // ACT
            //

            var isSuccess = NewController().Unpublish(vehicle1.Id).GetOkPayload<bool>();

            //
            // ASSERT
            //

            Assert.IsTrue(isSuccess);
            var fromDb = GetFromDb<Vehicle>(vehicle1.Id);
            Assert.AreEqual(fromDb.VehicleStatus, VehicleStatus.Unpublished);
        }

    }
}