namespace Triven.Domain.ViewModels.BlobStorage.Response
{
    public class BlobStorageUploadStreamResponseModel
    {
        public bool Success { get; set; }
        public string Uri { get; set; }

        public static class Factory
        {
            public static BlobStorageUploadStreamResponseModel Succeed(string uri)
            {
                return new BlobStorageUploadStreamResponseModel {Success = true, Uri =  uri};
            }

            public static BlobStorageUploadStreamResponseModel Fail()
            {
                return new BlobStorageUploadStreamResponseModel {Success = false};
            }
        }
    }
}