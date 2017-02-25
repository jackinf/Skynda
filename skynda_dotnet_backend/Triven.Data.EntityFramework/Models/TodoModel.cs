using System;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    public class TodoModel : AuditableModel, ITodoModel
    {
        public string Text { get; set; }
        public bool IsDone { get; set; }
        public DateTime? Deadline { get; set; }
    }
}