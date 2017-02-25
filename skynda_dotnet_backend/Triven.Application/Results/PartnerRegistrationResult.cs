using FluentValidation.Results;
using X3Project.Domain.Results;

namespace X3Project.Application.Results
{
    public class PartnerRegistrationResult : ServiceResult
    {
        public string Message { get; set; }

        //public static class Factory
        //{
        //    public static IResult Fail(ValidationResult validation)
        //    {
        //        PartnerRegistrationResult result = ControllerResult.Factory.Fail(validation) as PartnerRegistrationResult;

        //    }

        //    public static IResult Success()
        //    {
        //    }
        //}
    }
}