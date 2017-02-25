using System;
using X3Project.Data.EntityFramework.Models.Base;
using X3Project.Domain.Models;

namespace X3Project.Data.EntityFramework.Models
{
    public class TodoModel : AuditableModel, ITodoModel
    {
        public string Text { get; set; }
        public bool IsDone { get; set; }
        public DateTime? Deadline { get; set; }
    }
}