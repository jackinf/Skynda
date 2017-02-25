using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Models.Partner;
using Triven.Data.EntityFramework.Models.User;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Constants;
using Triven.Domain.Models;
using Triven.Domain.Models.Partner;
using Triven.Domain.Repositories.Partner;
using Triven.Domain.Results;

namespace Triven.Data.EntityFramework.Repositories
{
    public class PartnerRepository : BaseCrudRepository<PartnerModel>, IPartnerRepository<PartnerModel>
    {
        public override PartnerModel Get(int id)
        {
            return BaseQuery()
                .Include(x => x.ContactPersons.Select(xx => xx.ContactInfos))
                .Include(x => x.PartnerUsers)   // NB! Include is expensive
                .Include(x => x.Vehicles)
                .SingleOrDefault(m => m.Id == id);
        }

        public PartnerModel GetWithUser(int id)
        {
            return BaseQuery()
                .Include(x => x.User)
                .SingleOrDefault(m => m.Id == id);
        }

        public PartnerModel GetWithPartnersUsers(int id)
        {
            return BaseQuery()
                .Include(x => x.PartnerUsers)
                .SingleOrDefault(m => m.Id == id);
        }

        /// <summary>
        /// Finds partner by VAT number
        /// </summary>
        /// <param name="vatNumber"></param>
        /// <returns></returns>
        public IPartnerModel GetByVat(string vatNumber)
        {
            return GetAll().FirstOrDefault(x => x.VatNumber == vatNumber);
        }

        public ICollection<IPartnerModel> GetAllWaitingConfirmationPartners()
        {
            var result = new List<IPartnerModel>();
            var partners = GetAll().Where(x => x.Status == PartnerStatus.WaitingConfirm).ToList();
            result.AddRange(partners);
            return result;
        }

        public int CountAllWaitingConfirmationPartners() => GetAll().Count(x => x.Status == PartnerStatus.WaitingConfirm);

        public virtual IResult<PartnerModel> UpdateWithContactPersonInfo(int id, PartnerModel model)
        {
            //foreach (var contactPerson in model.ContactPersons)
            //{
            //    _context.Entry(contactPerson.ContactInfos).State = EntityState.Modified;
            //}
            //_context.Entry(model.ContactPersons.Select(xx => xx.ContactInfos).ToList()).State = EntityState.Modified;
            //_context.Entry(model.ContactPersons.Select(xx => xx.ContactInfos[0])).State = EntityState.Modified;
            return base.Update(id, model);
        }

        public bool AddPartnerUser(PartnerModel partner, IApplicationUser user) // TODO: maybe use user id instead of using a user from the other database context?
        {
            _context.Entry(partner).State = EntityState.Modified;
            var appUser = _context.Users.Find(user.Id) as ApplicationUser;  // find user again because we need to be in the same context
            partner.PartnerUsers.Add(appUser);
            partner.UpdatedOn = DateTime.Now;
            var changes = _context.SaveChanges();
            return changes > 0;  // OnCreateOrUpdateResult<PartnerModel>.Factory.Success(partner);
        }

        public bool RemovePartnerUser(PartnerModel partner, IApplicationUser user)
        {
            _context.Entry(partner).State = EntityState.Modified;
            var appUser = partner.PartnerUsers.FirstOrDefault(x => x.Id == user.Id);
            partner.PartnerUsers.Remove(appUser);
            var changes = _context.SaveChanges();
            return changes > 0;
        }
    }
}