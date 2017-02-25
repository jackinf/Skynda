using System;
using Triven.Domain.ViewModelInterfaces;

namespace Triven.Domain.ViewModels
{
    public class TodoPutViewModel : ITodoViewModel
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public bool IsDone { get; set; }
        public DateTime? Deadline { get; set; }
    }
}