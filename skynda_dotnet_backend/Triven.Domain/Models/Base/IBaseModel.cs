using System;

namespace X3Project.Domain.Models.Base
{
    public interface IBaseModel
    {
        /// <summary>
        /// Guid
        /// </summary>
        int Id { get; set; }
    }
}