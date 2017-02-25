using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net.Mail;
using Triven.Domain.Models.Message;

namespace Triven.Domain.Infrastructure.Notice
{
    public abstract class NoticeBase
    {

        protected virtual string Name { get; set; }

        protected virtual string[] Fields { get; set; }

        protected IMessageModel Template { get; set; }

        // Creates and initializes a new ListDictionary.
        protected ListDictionary ReplacementFields { get; set; } = new ListDictionary();

        protected List<MailAddress> Recipients { get; set; } = new List<MailAddress>();

        /// <summary>
        /// Get notice name
        /// </summary>
        /// <returns></returns>
        public string GetName()
        {
            return Name;
        }

        /// <summary>
        /// Get notice variables
        /// </summary>
        /// <returns></returns>
        public string[] GetVariables()
        {
            return Fields;
        }

        /// <summary>
        /// Return notice template
        /// </summary>
        /// <returns></returns>
        public IMessageModel GetTemplate()
        {
            return Template;
        }

        /// <summary>
        /// Set template
        /// </summary>
        /// <param name="template"></param>
        public void SetTemplate(IMessageModel template)
        {
            Template = template;
        }

        /// <summary>
        /// Add new replavement value for vars
        /// </summary>
        /// <param name="key">Replacement vaiable key e.g {EMAIL}</param>
        /// <param name="value">replavement value</param>
        public void AddReplacementValue(string key, string value)
        {
            if (Fields.Contains(key))
                ReplacementFields.Add(key, value);
        }

        public ListDictionary GetReplacementFields()
        {
            return ReplacementFields;
        }

        public List<MailAddress> GetRecipients()
        {
            return Recipients;
        }

        public void AddRecipient(MailAddress address)
        {
            Recipients.Add(address);
        }
    }
}
