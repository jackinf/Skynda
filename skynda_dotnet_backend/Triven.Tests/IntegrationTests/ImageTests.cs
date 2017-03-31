using System.Collections.Generic;
using System.Diagnostics;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.Domain.ViewModels.Image;
using Triven.FunctionalTests.Utils;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class ImageTests : TestsBase
    {
        [DebuggerStepThrough]
        ImageController NewController() => new ImageController();

        [SetUp]
        public void SetUp() => ClearAllTablesAndApply();

        [Test]
        public void should_list()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController()
                .List("")
                .GetOkPayload<IList<ImageViewModel>>();

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }
    }
}