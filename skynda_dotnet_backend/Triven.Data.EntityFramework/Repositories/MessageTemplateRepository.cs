using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Data.EntityFramework.Models.MessageTemplate;
using X3Project.Data.EntityFramework.Repositories.Base;
using X3Project.Domain.Models.Message;
using X3Project.Domain.Repositories.Message;

namespace X3Project.Data.EntityFramework.Repositories
{
    public class MessageTemplateRepository : BaseCrudRepository<MessageTemplateModel>, IMessageRepository<MessageTemplateModel>
    {
        /// <summary>
        /// Find message template by name and locale
        /// </summary>
        /// <param name="name"></param>
        /// <param name="locale"></param>
        /// <returns></returns>
        public IMessageModel GetByNameAndLocale(string name, string locale)
        {
            return BaseQuery()
                .SingleOrDefault(m => m.Name == name && m.LocaleString == locale);
        }
    }
}
