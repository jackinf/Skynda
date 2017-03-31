using NUnit.Framework;
using Triven.API.Controllers;
using Triven.Domain.ViewModels.BlobStorage;
using Triven.FunctionalTests.Utils;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class BlobStorageTests : TestsBase
    {
        BlobStorageController NewController() => new BlobStorageController();

        [Test]
        public void should_create_container()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var requestParams = new CreateContainerViewModel();
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