using System.Diagnostics;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.FunctionalTests.Utils;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class ClassificationTests : TestsBase
    {
        [DebuggerStepThrough]
        ClassificationController NewController() => new ClassificationController();

        [SetUp]
        public void SetUp() => ClearAllTablesAndApply();
    }
}