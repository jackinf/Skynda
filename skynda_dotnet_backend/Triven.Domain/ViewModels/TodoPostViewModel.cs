using System;
using X3Project.Domain.ViewModels;

namespace X3Project.Application.ViewModels
{
    public class TodoPostViewModel : ITodoViewModel
    {
        public string Text { get; set; }
        public bool IsDone { get; set; }
        public DateTime? Deadline { get; set; }
    }
}