using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Feature
{
    public class FeatureModel : BaseModel
    {
        public string Description { get; set; }
        public int Weight { get; set; }
        public string Value { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public bool IsImported { get; set; }
    }
}