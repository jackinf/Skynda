using System.Web.Http;
using Triven.Application.Results;
using Triven.Domain.ViewModels.Image;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/fileUpload")]
    public class FileUploadController : BaseController
    {
        [HttpPost]
        public IHttpActionResult PostFormData([FromBody] ImageViewModel imageModel)
        {

            return HandleResult(new ServiceResult());
        }
    }
}