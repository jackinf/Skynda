using System;
using System.Collections.Generic;

namespace Triven.Domain.ViewModels.Common
{
    public class CreateOrUpdateResponseModel : BaseModel
    {
        public bool Success { get; set; }
        public IList<string> Errors { get; set; }
        public bool IsModal { get; set; }
        public int VehicleId { get; set; }
        public string ErrorMessage { get; set; }

        public static class Factory
        {
            public static CreateOrUpdateResponseModel Fail(string errorMessage, IList<string> errors)
            {
                return new CreateOrUpdateResponseModel { Success = false, ErrorMessage = errorMessage, Errors = errors};
            }

            public static CreateOrUpdateResponseModel Success(int id)
            {
                return new CreateOrUpdateResponseModel { Id = id , Success = true };
            }
        }
    }
}