using System.IO;
using System.Web;

namespace Triven.Domain.ViewModels.BlobStorage
{
    public class UploadBlobViewModel
    {
        public string ContainerName { get; set; }
        public string BlobName { get; set; }
        public HttpPostedFile FileSource;
        public byte[] ByteArray;
    }
}