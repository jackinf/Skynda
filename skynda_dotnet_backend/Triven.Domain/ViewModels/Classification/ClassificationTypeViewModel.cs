using System.Collections.Generic;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Classification
{
    public class ClassificationTypeViewModel : BaseViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public IList<ClassificationViewModel> Classifications { get; set; } = new List<ClassificationViewModel>();
    }
}