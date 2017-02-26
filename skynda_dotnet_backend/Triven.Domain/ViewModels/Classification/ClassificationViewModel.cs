using System;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Classification
{
    public class ClassificationViewModel : BaseViewModel
    {
        public string Description { get; set; }
        public bool IsImported { get; set; }
        public int Weight { get; set; }
        public string Value { get; set; }
        public int ModifierUserId { get; set; }
        public string ModifierUserIp { get; set; }
        public DateTime Archived { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public string Value2 { get; set; }
    }
}