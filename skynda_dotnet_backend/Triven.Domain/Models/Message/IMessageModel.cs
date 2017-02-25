using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Constants;
using X3Project.Domain.Models.Base;

namespace X3Project.Domain.Models.Message
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
