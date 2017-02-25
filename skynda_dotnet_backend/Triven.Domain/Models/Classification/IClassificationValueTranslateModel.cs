using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Constants;
using X3Project.Domain.Models.Base;

namespace X3Project.Domain.Models.Classification
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
