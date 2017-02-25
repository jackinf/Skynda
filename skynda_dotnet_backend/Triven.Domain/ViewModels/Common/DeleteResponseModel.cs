namespace Triven.Domain.ViewModels.Common
{
    public class DeleteResponseModel
    {

        public static class Factory
        {
            public static DeleteResponseModel Success()
            {
                return new DeleteResponseModel { Success = true};
            }

            public static DeleteResponseModel Fail(string error)
            {
                return new DeleteResponseModel { Success = false, Error = error };
            }
        }
        public bool Success { get; set; }

        public string Error { get; set; }
    }
}