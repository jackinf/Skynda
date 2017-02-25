using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Models.Base;

namespace X3Project.Domain.Models.Classification
{
    public interface IClassificationValueModel : IBaseModel
    {
        int Classification_FK { get; set; }
        int ClassificationParent_FK { get; set; }
        string Value { get; set; }
        int Position { get; set; }
    }
}
