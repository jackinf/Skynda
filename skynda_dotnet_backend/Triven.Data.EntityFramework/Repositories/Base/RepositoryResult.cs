using System;
using Triven.Domain.Models.Base;
using Triven.Domain.Results;

namespace Triven.Data.EntityFramework.Repositories.Base
{
    public abstract class RepositoryResult<TModel> : IResult<TModel> 
        where TModel : IBaseModel
    {
        public Guid EntityId { get; set; }
        public bool IsSuccess { get; set; }
        public TModel ContextObject { get; set; }
        public string Message { get; set; }
    }
}