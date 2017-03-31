using System.Diagnostics;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.FunctionalTests.Utils;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class VehicleTests : TestsBase
    {
        [DebuggerStepThrough]
        VehicleController NewController() => new VehicleController();

        [SetUp]
        public void SetUp() => ClearAllTablesAndApply();
    }
}