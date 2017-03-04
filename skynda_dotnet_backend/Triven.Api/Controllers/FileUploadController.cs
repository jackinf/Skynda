using System;
using System.Web.Http;
using Triven.Domain.ViewModels.Image;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/fileUpload")]
    public class FileUploadController : BaseController
    {
        [HttpPost]
        public IHttpActionResult PostFormData([FromBody] ImageViewModel imageModel)
        {
            throw new NotImplementedException();
            //return HandleResult(new ServiceResult());
        }
    }
}