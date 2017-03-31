using System;
using System.Diagnostics;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.Domain.ViewModels.Email;
using Triven.FunctionalTests.Utils;

namespace Triven.FunctionalTests.IntegrationTests
{
    [Obsolete("SubscriptionController is obsolete")]
    public class SubscriptionTests : TestsBase
    {
        [DebuggerStepThrough]
        SubscriptionController NewController() => new SubscriptionController();

        [SetUp]
        public void SetUp() => ClearAllTablesAndApply();

        //[Test]
        public void should_subscribe_email()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController()
                .SubscribeEmail(new EmailSubscribeViewModel())
                .GetOkPayload<EmailSubscribeViewModel>();

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }
    }
}