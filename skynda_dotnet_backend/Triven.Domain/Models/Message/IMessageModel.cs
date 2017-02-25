using Triven.Domain.Constants;
using Triven.Domain.Models.Base;

namespace Triven.Domain.Models.Message
{
    public interface IMessageModel : IAuditableBaseModel
    {
        /// <summary>
        /// Message name
        /// </summary>
        string Name { get; set; }

        /// <summary>
        /// Message locale
        /// </summary>
        Language Locale { get; set; }


        /// <summary>
        /// Message title text
        /// </summary>
        string Title { get; set; }

        /// <summary>
        /// Message text with fields
        /// </summary>
        string Message { get; set; }

        /// <summary>
        /// Fields that can be replaced
        /// </summary>
        string Fields { get; set; }
    }
}
