﻿using System;
using Triven.Domain.ViewModelInterfaces;

namespace Triven.Domain.ViewModels
{
    public class TodoDisplayViewModel : ITodoViewModel
    {
        public string Text { get; set; }
        public bool IsDone { get; set; }
        public DateTime? Deadline { get; set; }
    }
}