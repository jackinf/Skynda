using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("Image")]
    public class Image : AuditableModel, IImage
    {
        public string Url { get; set; }
        public string BlobName { get; set; }
        public string ContainerName { get; set; }

        public string ThumbnailUrl { get; set; }
        public string ThumbnailBlobName { get; set; }
    }
}