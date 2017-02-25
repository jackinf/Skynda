using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation.Internal;

namespace X3Project.Domain.ViewModels.Base
{
    public class BasicResponseViewModel
    {
        public string Message { get; set; }
        public string RedirectUrl { get; set; }
    }
}
