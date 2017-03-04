using System.Collections.Generic;
using Triven.Domain.Constants;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Account;

namespace Triven.Domain.Services
{
    public interface IAccountService
    {
        ServiceResult<AccountDisplayViewModel> Register(string email, string password, string confirmPassword, string firstName = null, string lastName = null, Auth.Roles role = Auth.Roles.User);

        /// <summary>
        /// Returns user account data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResult<AccountDisplayViewModel> GetAccountData(int id);

        /// <summary>
        /// Updates user profile data
        /// </summary>
        /// <returns>id</returns>
        ServiceResult<int> UpdateUserAccountData(int id, AccountDisplayViewModel viewModel);

        /// <summary>
        /// Gets all users
        /// </summary>
        /// <returns></returns>
        ServiceResult<List<AccountDisplayViewModel>> GetUsers();
    }
}