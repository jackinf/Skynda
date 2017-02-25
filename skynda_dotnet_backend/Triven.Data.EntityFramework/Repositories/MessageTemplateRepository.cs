using System.Linq;
using Triven.Data.EntityFramework.Models.MessageTemplate;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Models.Message;
using Triven.Domain.Repositories.Message;

namespace Triven.Data.EntityFramework.Repositories
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
