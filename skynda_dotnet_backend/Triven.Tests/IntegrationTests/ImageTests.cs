using System.Diagnostics;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.FunctionalTests.Utils;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class ImageTests : TestsBase
    {
        [DebuggerStepThrough]
        ImageController NewController() => new ImageController();

        [SetUp]
        public void SetUp() => ClearAllTablesAndApply();
    }
}