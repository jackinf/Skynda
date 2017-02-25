using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IImage : IAuditableBaseModel
    {
        string Url { get; set; }
        string BlobName { get; set; }
        string ContainerName { get; set; }
    }
}