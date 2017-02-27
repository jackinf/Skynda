using System.Web.Http;
using System.Web.Http.Cors;
using FluentValidation.Results;
using Triven.Application.Results;

namespace Triven.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public abstract class BaseController : ApiController
    {
        /// <summary>
        /// Returns errors
        /// </summary>
        /// <param name="result"></param>
        /// <returns></returns>
        protected virtual IHttpActionResult ReturnErrorResult(ValidationResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (result.Errors != null)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
                }
            }
            if (ModelState.IsValid)
            {
                // No ModelState errors are available to send, so just return an empty BadRequest.
                return BadRequest();
            }
            return BadRequest(ModelState);
        }

        /// <summary>
        /// Checks if there is errors in Modelstate or in FluentValidation result
        /// </summary>
        /// <param name="validatorResult"></param>
        /// <returns></returns>
        protected virtual bool IsValid(ValidationResult validatorResult = null)
        {
            if (validatorResult != null && !validatorResult.IsValid)
                return false;
            return ModelState.IsValid;
        }

        protected IHttpActionResult HandleResult(ServiceResult result)
        {
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }
    }
}