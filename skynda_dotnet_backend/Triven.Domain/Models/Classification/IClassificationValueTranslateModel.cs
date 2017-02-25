using Triven.Domain.Constants;
using Triven.Domain.Models.Base;

namespace Triven.Domain.Models.Classification
{
    public interface IClassificationValueTranslateModel : IBaseModel
    {
        int ClassificationValue_FK { get; set; }
        int ClassificationParent_FK { get; set; }

        /// <summary>
        /// Locale
        /// </summary>
        Language Locale { get; set; }

        /// <summary>
        /// Translated classification
        /// </summary>
        string Text { get; set; }
    }
}
