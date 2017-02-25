using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IFeature : IAuditableBaseModel
    {
        string Description { get; set; }
        bool IsImported { get; set; }
        int Weight { get; set; }
        string Value { get; set; }
        string Name { get; set; }
        IClassificationType ClassificationType { get; set; }
        bool IsActive { get; set; }
    }
}