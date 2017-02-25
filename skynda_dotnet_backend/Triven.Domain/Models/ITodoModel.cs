using System;
using X3Project.Domain.Models.Base;

namespace X3Project.Domain.Models
{
    public interface ITodoModel : IAuditableBaseModel
    {
        string Text { get; set; }
        bool IsDone { get; set; }
        DateTime? Deadline { get; set; }
    }
}