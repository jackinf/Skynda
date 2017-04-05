using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Constants;
using Triven.Domain.Extensions;
using Triven.Domain.Models.Message;

namespace Triven.Data.EntityFramework.Models.MessageTemplate
{
    [Table("MessageTemplate")]
    public class MessageTemplateModel : AuditableModel, IMessageModel
    {
        [Key, Column(Order = 0)]
        public override int Id { get; set; }

        [Key, Column(Order = 1)]
        public string Name { get; set; }

        public string Message { get; set; }
        public string Fields { get; set; }

        /// <summary>
        /// Enum for DB as string
        /// </summary>
        [Column("Locale", Order = 2)]
        [Key]
        public string LocaleString
        {
            get { return Locale.ToString(); }
            private set { Locale = value.ParseEnum<Language>(); }
        }

        [NotMapped]
        public Language Locale { get; set; }

        public string Title { get; set; }
    }
}
