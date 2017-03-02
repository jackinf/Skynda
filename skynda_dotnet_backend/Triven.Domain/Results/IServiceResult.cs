using System;
using System.Collections.Generic;
using System.Linq;
using FluentValidation.Results;
using Triven.Domain.Models.Base;

namespace Triven.Domain.Results
{
    public interface IResult<TModel> where TModel : IBaseModel
    {
        /// <summary>
        /// Id of an entity. (Todo: maybe wrong place for this property)
        /// </summary>
        Guid EntityId { get; set; }

        /// <summary>
        /// Is a result successful? E.g. is update of an entity successful?
        /// </summary>
        bool IsSuccess { get; set; }

        /// <summary>
        /// Request message E.g for successful result
        /// </summary>
        string Message { get; set; }

        TModel ContextObject { get; set; }
    }

    public interface IServiceResult
    {
        bool IsSuccessful { get; set; }
        string Message { get; set; }
        ValidationResult Validation { get; set; }
        object Payload { get; set; }
        void AddErrors(ValidationResult validation);
    }

    public abstract class ServiceBaseResult<T> : IServiceResult where T : IServiceResult, new()
    {
        public bool IsSuccessful { get; set; }
        public ValidationResult Validation { get; set; }
        public object Payload { get; set; }
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

            public static T Fail(ValidationResult validation)
            {
                var result = new T
                {
                    IsSuccessful = false,
                    Validation = validation
                };

                return result;
            }

            public static T Fail(IEnumerable<string> errors)
            {
                var result = new T
                {
                    IsSuccessful = false,
                    Validation =
                        new ValidationResult(errors.Select(error => new ValidationFailure(string.Empty, error)))
                };
                // TODO: string.Empty - should be correct property
                return result;
            }

            public static T Fail(IEnumerable<ValidationFailure> errors)
            {
                var result = new T
                {
                    IsSuccessful = false,
                    Validation =
                        new ValidationResult(errors.Select(error => new ValidationFailure(error.PropertyName, error.ErrorMessage)))
                };
                // TODO: string.Empty - should be correct property
                return result;
            }

            public static T Success()
            {
                var result = new T();
                result.IsSuccessful = true;
                return result;
            }

            public static T Success<TPayload>(TPayload payload, string message  = "")
            {
                var result = new T
                {
                    IsSuccessful = true,
                    Payload = payload,
                    Message = message
                };

                return result;
            }
        }
    }
}