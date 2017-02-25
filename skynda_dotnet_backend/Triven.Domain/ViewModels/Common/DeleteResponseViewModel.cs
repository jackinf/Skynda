namespace Triven.Domain.ViewModels.Common
{
    public class DeleteResponseViewModel
    {

        public static class Factory
        {
            public static DeleteResponseViewModel Success()
            {
                return new DeleteResponseViewModel { Success = true};
            }

            public static DeleteResponseViewModel Fail(string error)
            {
                return new DeleteResponseViewModel { Success = false, Error = error };
            }
        }
        public bool Success { get; set; }

        public string Error { get; set; }
    }
}