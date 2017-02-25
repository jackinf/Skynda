using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Models.Classification;

namespace X3Project.Data.EntityFramework.Models.Classification
{
    [Table("ClassificationValue")]
    public class ClassificationValueModel : IClassificationValueModel
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Classification")]
        public int Classification_FK { get; set; }

        public string Value { get; set; }
        public int Position { get; set; }

        public ClassificationModel Classification { get; set; }

        [InverseProperty("ClassificationValue")]
        public List<ClassificationValueTranslateModel> TranslatedValues { get; set; }

        public int ClassificationParent_FK { get; set; }
    }
}
