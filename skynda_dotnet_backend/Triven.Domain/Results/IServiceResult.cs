using FluentValidation.Results;

namespace Triven.Domain.Results
{
    public interface IServiceResult
    {
        bool IsSuccessful { get; set; }
        string Message { get; set; }
        ValidationResult Validation { get; set; }
        object Payload { get; set; }
        void AddErrors(ValidationResult validation);
    }
}