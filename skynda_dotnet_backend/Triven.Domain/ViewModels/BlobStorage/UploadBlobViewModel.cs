using System.Web;

namespace Triven.Domain.ViewModels.BlobStorage
{
    public class UploadBlobViewModel
    {
        public string ContainerName { get; set; }
        public string BlobName { get; set; }
        public HttpPostedFile FileSource { get; set; }
        public byte[] ByteArray { get; set; }
        public string ContentType { get; set; }

    }
}