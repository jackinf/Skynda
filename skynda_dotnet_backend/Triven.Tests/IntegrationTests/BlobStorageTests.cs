using System;
using System.Diagnostics;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.Domain.ViewModels.BlobStorage;
using Triven.FunctionalTests.Utils;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class BlobStorageTests : TestsBase
    {
        [DebuggerStepThrough]
        BlobStorageController NewController() => new BlobStorageController();

        private const string TestContainer = "Test123123";

        [Test]
        public void should_create_container()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var requestParams = new CreateContainerViewModel { ContainerName = TestContainer };
            NewController().CreateContainer(requestParams);

            //
            // ASSERT
            //
        }

        [Test]
        public void should_upload()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            //
            // ASSERT
            //
        }

        [Test]
        public void should_list()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            //
            // ASSERT
            //
        }

        [Test]
        public void should_download()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            //
            // ASSERT
            //
        }

        [Test]
        public void should_delete()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            //
            // ASSERT
            //
        }
    }
}