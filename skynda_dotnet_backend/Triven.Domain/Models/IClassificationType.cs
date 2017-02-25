using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IClassificationType : IAuditableBaseModel
    {
        string Name { get; set; }
        string Description { get; set; }
    }
}