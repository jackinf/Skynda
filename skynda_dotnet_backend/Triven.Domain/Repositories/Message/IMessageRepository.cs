using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Models.Message;
using X3Project.Domain.Repositories.Base;

namespace X3Project.Domain.Repositories.Message
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
