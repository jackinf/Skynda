using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IUser : IAuditableBaseModel
    {
        string Login { get; set; }
        string Email { get; set; }
        string Phone { get; set; }
        string Password { get; set; }
        string Language { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        bool Enabled { get; set; }
    }
}