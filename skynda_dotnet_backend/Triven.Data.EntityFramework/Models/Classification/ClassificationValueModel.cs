using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Domain.Models.Classification;

namespace Triven.Data.EntityFramework.Models.Classification
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
