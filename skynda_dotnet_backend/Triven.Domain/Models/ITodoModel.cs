using System;
using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface ITodoModel : IAuditableBaseModel
    {
        string Text { get; set; }
        bool IsDone { get; set; }
        DateTime? Deadline { get; set; }
    }
}