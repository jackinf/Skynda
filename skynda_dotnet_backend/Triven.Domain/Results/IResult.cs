using System;
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
}