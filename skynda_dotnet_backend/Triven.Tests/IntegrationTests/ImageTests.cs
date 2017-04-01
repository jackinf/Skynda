using System.Collections.Generic;
using System.Diagnostics;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.Domain.ViewModels.Image;
using Triven.FunctionalTests.Utils;
using Triven.FunctionalTests.Utils.EntityHelpers;

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

            ImageUtils.Create();
            ImageUtils.Create();

            //
            // ACT
            //

            var result = NewController().List("image").GetOkPayload<IList<ImageViewModel>>();

            //
            // ASSERT
            //

            Assert.AreEqual(2, result.Count);
        }
    }
}