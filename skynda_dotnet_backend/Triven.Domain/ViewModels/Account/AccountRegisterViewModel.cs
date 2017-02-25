using Triven.Domain.ViewModelInterfaces;

namespace Triven.Domain.ViewModels.Account
{
    public class AccountRegisterViewModel : IAccountViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}