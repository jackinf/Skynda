namespace Triven.Domain.ViewModels.BlobStorage.Response
{
    public class BlobStorageUploadStreamResponseViewModel
    {
        public bool Success { get; set; }
        public string Uri { get; set; }

        public static class Factory
        {
            public static BlobStorageUploadStreamResponseViewModel Succeed(string uri)
            {
                return new BlobStorageUploadStreamResponseViewModel {Success = true, Uri =  uri};
            }

            public static BlobStorageUploadStreamResponseViewModel Fail()
            {
                return new BlobStorageUploadStreamResponseViewModel {Success = false};
            }
        }
    }
}