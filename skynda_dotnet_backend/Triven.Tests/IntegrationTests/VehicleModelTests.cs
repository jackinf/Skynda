using System.Diagnostics;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.FunctionalTests.Utils;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class VehicleModelTests : TestsBase
    {
        [DebuggerStepThrough]
        VehicleModelController NewController() => new VehicleModelController();

        [SetUp]
        public void SetUp() => ClearAllTablesAndApply();
    }
}