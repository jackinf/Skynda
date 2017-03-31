using System.Diagnostics;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.FunctionalTests.Utils;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class SubscriptionTests : TestsBase
    {
        [DebuggerStepThrough]
        SubscriptionController NewController() => new SubscriptionController();

        [SetUp]
        public void SetUp() => ClearAllTablesAndApply();
    }
}