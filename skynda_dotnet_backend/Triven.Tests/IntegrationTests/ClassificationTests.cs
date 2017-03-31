using System.Collections.Generic;
using System.Diagnostics;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.Domain.Constants;
using Triven.Domain.ViewModels.Classification;
using Triven.FunctionalTests.Utils;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class ClassificationTests : TestsBase
    {
        [DebuggerStepThrough]
        ClassificationController NewController() => new ClassificationController();

        [SetUp]
        public void SetUp() => ClearAllTablesAndApply();

        [Test]
        public void should_get_all()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController()
                .GetAll(DatabaseConstants.ClassificationTypeName.PaymentType)
                .GetOkPayload<IList<ClassificationViewModel>>();

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }
        
        [Test]
        public void should_get_all_vehicle_bound()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController()
                .GetVehicleBound(DatabaseConstants.ClassificationTypeName.PaymentType)
                .GetOkPayload<IList<ClassificationViewModel>>();

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }
    }
}