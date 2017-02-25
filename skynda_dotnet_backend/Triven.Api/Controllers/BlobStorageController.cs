using System.Net.Http;
using System.Web;
using System.Web.Http;
using Triven.Domain.ViewModels.BlobStorage;

namespace Triven.API.Controllers
{
    [System.Web.Mvc.RoutePrefix("/api/blob")]
    public class BlobStorageController : BaseController
    {
        private readonly dynamic _service; // TODO: use correct type

        public BlobStorageController()
        {
            // TODO: inject service
        }

        [HttpPost, Route("create_container")]   // TODO: use create-container
        public IHttpActionResult CreateContainer([FromBody] CreateContainerViewModel viewModel) => _service.CreateContainer(viewModel);

        [HttpPost, Route("upload")]
        public IHttpActionResult Upload([FromBody] UploadBlobViewModel viewModel, MultipartFileData file)
        {
            var httpRequest = HttpContext.Current.Request;
            viewModel.FileSource = httpRequest.Files[0];
            var result = _service.Upload(viewModel);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HttpPost, Route("list")]
        public IHttpActionResult List(ListBlobsViewModel viewModel)
        {
            var result = _service.List(viewModel);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HttpPost, Route("download")]
        public IHttpActionResult Download(DownloadBlobViewModel viewModel)
        {
            var result = _service.Download(viewModel);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HttpPost, Route("delete")]
        public IHttpActionResult Download(DeleteBlobViewModel viewModel)
        {
            var result = _service.Delete(viewModel);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

    }
}