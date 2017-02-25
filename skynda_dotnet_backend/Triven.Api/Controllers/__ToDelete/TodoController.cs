using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;
using Triven.Domain.Models;
using Triven.Domain.Services;
using Triven.Domain.ViewModels;

namespace Triven.API.Controllers.__ToDelete
{
    [RoutePrefix("api/todos")]
    public class TodoController : BaseController
    {
        private readonly ITodoService _service;

        public TodoController(ITodoService service)
        {
            _service = service;
        }
        
        [HttpGet, ResponseType(typeof(List<TodoDisplayViewModel>))]
        public IEnumerable<TodoDisplayViewModel> GetTodos() => _service.GetAll<TodoDisplayViewModel>();

        [HttpGet, ResponseType(typeof(TodoDisplayViewModel))]
        public IHttpActionResult GetTodoModel(int id)
        {
            var viewModel = _service.Get<TodoDisplayViewModel>(id);
            return viewModel != null ? Ok(viewModel) : (IHttpActionResult) NotFound();
        }

        [Route("{id:int}"), HttpPut, ResponseType(typeof(void))]
        public IHttpActionResult PutTodoModel([FromUri] int id, [FromBody] TodoPutViewModel viewModel)
        {
            var result = _service.Update(id, viewModel);
            return result.IsSuccess ? (IHttpActionResult) Ok(id) : BadRequest();
        }
        
        [HttpPost, ResponseType(typeof(ITodoModel))]
        public IHttpActionResult Post([FromBody] TodoPostViewModel viewModel)
        {
            var response = _service.Add(viewModel);
            return CreatedAtRoute("DefaultApi", new { id = response.EntityId }, viewModel); // TODO: What is this?
        }
        
        [HttpDelete, ResponseType(typeof(bool))]
        public IHttpActionResult DeleteTodoModel(int id) => _service.Delete(id) ? (IHttpActionResult) Ok() : BadRequest();
    }
}