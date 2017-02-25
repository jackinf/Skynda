using Triven.Domain.Models.Message;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories.Message
{
    public interface IMessageRepository<TMessageModel> : IBaseCrudRepository<TMessageModel>
        where TMessageModel : IMessageModel
    {
        /// <summary>
        /// Find message by name and locale
        /// </summary>
        /// <param name="name"></param>
        /// <param name="locale"></param>
        /// <returns></returns>
        IMessageModel GetByNameAndLocale(string name, string locale);
    }
}
