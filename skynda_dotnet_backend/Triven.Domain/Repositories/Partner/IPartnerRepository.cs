using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Models.Partner;
using Triven.Domain.Repositories.Base;
using Triven.Domain.Results;

namespace Triven.Domain.Repositories.Partner
{
    public interface IPartnerRepository<TPartnerModel> : IBaseCrudRepository<TPartnerModel>
        where TPartnerModel : IPartnerModel
    {
        TPartnerModel GetWithUser(int id);

        TPartnerModel GetWithPartnersUsers(int id);

        /// <summary>
        /// Find Partner by VAT number
        /// </summary>
        /// <param name="vatNumber"></param>
        /// <returns></returns>
        IPartnerModel GetByVat(string vatNumber);

        /// <summary>
        /// Find all partners who have made registration but not activated by administrator
        /// </summary>
        /// <returns></returns>
        ICollection<IPartnerModel> GetAllWaitingConfirmationPartners();

        int CountAllWaitingConfirmationPartners();

        IResult<TPartnerModel> UpdateWithContactPersonInfo(int id, TPartnerModel entity);

        bool AddPartnerUser(TPartnerModel partner, IApplicationUser user);
        bool RemovePartnerUser(TPartnerModel partner, IApplicationUser user);
    }
}