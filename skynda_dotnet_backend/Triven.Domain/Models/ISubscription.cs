using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface ISubscription : IAuditableBaseModel
    {
        bool IsActive { get; set; }
        string Email { get; set; }
    }
}