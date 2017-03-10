using System;
using System.Collections.Generic;
using System.Linq;
using FluentValidation.Results;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Domain.Results
{
    public abstract class ServiceBaseResult<TPayload>
    {
        public bool IsSuccessful { get; set; }
        public ValidationResult Validation { get; set; }
        public TPayload Payload { get; set; }
        public void AddErrors(ValidationResult validation)
        {
            if (Validation == null)
                Validation = new ValidationResult();
            foreach (var error in validation.Errors)
            {
                IsSuccessful = false;
                Validation.Errors.Add(error);
            }
        }

        public string Message { get; set; }

        public static class Factory
        {
            public static ServiceResult<TPayload> Fail(ValidationResult validation)
            {
                var result = new ServiceResult<TPayload>
                {
                    IsSuccessful = false,
                    Validation = validation
                };
                return result;
            }

            public static ServiceResult<TPayload> Fail(IEnumerable<string> errors)
            {
                var result = new ServiceResult<TPayload>
                {
                    IsSuccessful = false,
                    Validation = new ValidationResult(
                        errors.Select(error => new ValidationFailure(string.Empty, error)))
                };
                // TODO: string.Empty - should be correct property
                return result;
            }

            public static ServiceResult<TPayload> Success()
            {
                var result = new ServiceResult<TPayload>();
                result.IsSuccessful = true;
                return result;
            }

            public static ServiceResult<TPayload> Success(TPayload payload, string message = "")
            {
                var result = new ServiceResult<TPayload>
                {
                    IsSuccessful = true,
                    Payload = payload,
                    Message = message
                };
                return result;
            }

            public static ServiceResult<TPayload> Fail(IList<ValidationFailure> errors)
            {
                var result = new ServiceResult<TPayload>
                {
                    IsSuccessful = false,
                    Validation = new ValidationResult(
                        errors.Select(error => new ValidationFailure(error.PropertyName, error.ErrorMessage)))
                };
                // TODO: string.Empty - should be correct property
                return result;
            }

            public static ServiceResult<TPayload> Handle(bool success, TPayload payload, string message = "", IEnumerable<ValidationFailure> errors = null)
            {
                return success ? Success(payload, message) : Fail(errors?.ToList());
            }

            public static ServiceResult<TPayload> Fail(Exception exception)
            {
                var result = new ServiceResult<TPayload>
                {
                    IsSuccessful = false,
                    Validation = new ValidationResult(
                        new List<ValidationFailure> {new ValidationFailure(string.Empty, exception.Message)})
                };
                return result;
            }
        }
    }
}