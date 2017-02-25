using System;
using X3Project.Domain.Models.Base;
using X3Project.Domain.Results;

namespace X3Project.Data.EntityFramework.Repositories.Base
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