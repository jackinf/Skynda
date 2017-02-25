using Triven.Domain.Models.Base;

namespace Triven.Domain.Models.Classification
{
    public interface IClassificationValueModel : IBaseModel
    {
        int Classification_FK { get; set; }
        int ClassificationParent_FK { get; set; }
        string Value { get; set; }
        int Position { get; set; }
    }
}
