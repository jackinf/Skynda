using System.Diagnostics;
using System.Linq;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.Data.EntityFramework.Entities;
using Triven.Domain.ViewModels.Account;
using Triven.FunctionalTests.Utils;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class AccountTests : TestsBase
    {
        [DebuggerStepThrough]
        AccountController NewController() => new AccountController();

        [SetUp]
        public void SetUp() => ClearAllTablesAndApply();

        [Test]
        public void should_get_user_info()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            NewController().GetUserInfo();

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }

        [Test]
        public void should_logout()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            NewController().Logout();

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }

        [Test]
        public void should_get_manage_info()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController().GetManageInfo(null).Result;

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }
        
        [Test]
        public void should_change_password()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController().ChangePassword(new ChangePasswordBindingModel()).Result;

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }

        [Test]
        public void should_set_password()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController().SetPassword(new SetPasswordBindingModel()).Result;

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }

        [Test]
        public void should_add_external_login()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController().AddExternalLogin(new AddExternalLoginBindingModel()).Result;

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }

        [Test]
        public void should_remove_login()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController().RemoveLogin(new RemoveLoginBindingModel()).Result;

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }

        [Test]
        public void should_get_external_login()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController().GetExternalLogin("").Result;

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }

        [Test]
        public void should_get_external_logins()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController().GetExternalLogins("").ToList();

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }

        [Test]
        public void should_register()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController().Register(new AccountRegisterViewModel());

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }

        [Test]
        public void should_register_external()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController().RegisterExternal(new RegisterExternalBindingModel()).Result;

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }

        [Test]
        public void should_get_account_info()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController().GetAccountInfo();

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }

        [Test]
        public void should_edit_general_account_data()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController().EdidGeneralAccountData(new AccountDisplayViewModel());

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }

        [Test]
        public void should_get_users()
        {
            //
            // ARRANGE
            //

            //
            // ACT
            //

            var result = NewController().GetUsers();

            //
            // ASSERT
            //

            Assert.Fail("Not implemented");
        }
    }
}