using System.Collections.Generic;

namespace Triven.Domain.ViewModels.Common
{
    public class CreateOrUpdateResponseViewModel : BaseViewModel
    {
        public bool Success { get; set; }
        public IList<string> Errors { get; set; }
        public bool IsModal { get; set; }
        public int VehicleId { get; set; }
        public string ErrorMessage { get; set; }

        public static class Factory
        {
            public static CreateOrUpdateResponseViewModel Fail(string errorMessage, IList<string> errors)
            {
                return new CreateOrUpdateResponseViewModel { Success = false, ErrorMessage = errorMessage, Errors = errors};
            }

            public static CreateOrUpdateResponseViewModel Success(int id)
            {
                return new CreateOrUpdateResponseViewModel { Id = id , Success = true };
            }
        }
    }
}