using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Constants;
using X3Project.Domain.Extensions;
using X3Project.Domain.Models.Classification;

namespace X3Project.Data.EntityFramework.Models.Classification
{
    [Table("ClassificationValuesTranslate")]
    public class ClassificationValueTranslateModel : IClassificationValueTranslateModel
    {
        [Key]
        [Column(Order = 0)]
        public int Id { get; set; }

        [ForeignKey("ClassificationValue")]
        public int ClassificationValue_FK { get; set; }

        public string Text { get; set; }

        public ClassificationValueModel ClassificationValue { get; set; }

        /// <summary>
        /// Enum for DB as string
        /// </summary>
        [Column("Locale", Order = 1)]
        [Key]
        public string StatusString
        {
            get { return Locale.ToString(); }
            private set { Locale = value.ParseEnum<Language>(); }
        }
        [NotMapped]
        public Language Locale { get; set; }

        public int ClassificationParent_FK { get; set; }
    }
}
