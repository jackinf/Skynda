using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Models.Base;
using Triven.Domain.Repositories.Base;
using Triven.Domain.Results;

namespace Triven.Data.EntityFramework.Repositories.Base
{
    /// <summary>
    /// Generic Create-Read-Update-Delete logic. It can make life much easier.
    /// </summary>
    /// <typeparam name="TModel"></typeparam>
    public abstract class BaseCrudRepository<TModel> : IBaseCrudRepository<TModel>, IDisposable
        where TModel : class, IAuditableBaseModel
    {
        protected readonly ApplicationDbContext _context = new ApplicationDbContext();

        /// <summary>
        /// When object is updated, here fields can be specified.
        /// </summary>
        /// <param name="model"></param>
        protected virtual void OnBeforeUpdateMap(TModel model) { }

        /// <summary>
        /// Actions to make before deleting.
        /// </summary>
        /// <param name="id"></param>
        protected virtual void OnBeforeDelete(int id) { }

        /// <summary>
        /// Gets all the items from the database
        /// </summary>
        /// <returns></returns>
        public virtual IEnumerable<TModel> GetAll() => BaseQuery().OrderBy(x => x.Id);

        /// <summary>
        /// Gets all the items from the database by page size
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public virtual IEnumerable<TModel> GetPagedList(int pageNumber = 1, int pageSize = 25) => GetAll().Skip(pageSize * (pageNumber - 1)).Take(pageSize);

        /// <summary>
        /// Gets a single item from the databse
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual TModel Get(int id) => BaseQuery().SingleOrDefault(m => m.Id == id);

        /// <summary>
        /// Adds new item to the database and saves changes
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public virtual IResult<TModel> Add(TModel model)
        {
            //model.Id = Guid.NewGuid();
            _context.Set<TModel>().Add(model); // TODO: Fix   "exceptionMessage": "An entity object cannot be referenced by multiple instances of IEntityChangeTracker.",
            try
            {
                model.UpdatedOn = DateTime.Now;
                _context.SaveChanges();
                return OnCreateOrUpdateResult<TModel>.Factory.Success(model);
            }
            catch (DbUpdateException ex)
            {
                if (ItemExists(model.Id))
                    return OnCreateOrUpdateResult<TModel>.Factory.Fail(ex);
                throw;
            }
        }

        /// <summary>
        /// Updates an item in the database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        public virtual IResult<TModel> Update(int id, TModel model)
        {
            _context.Entry(model).State = EntityState.Modified;

            try
            {
                model.UpdatedOn = DateTime.Now;
                _context.SaveChanges();
                return OnCreateOrUpdateResult<TModel>.Factory.Success(model);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ItemExists(id))
                    return OnCreateOrUpdateResult<TModel>.Factory.Fail(ex);
                throw;
            }
        }


        /// <summary>
        /// Deletes an item in the database
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual bool Delete(int id)
        {
            var model = _context.Set<TModel>().SingleOrDefault(m => m.Id == id);
            if (model == null)
                return false;

            OnBeforeDelete(id);

            model.DeletedOn = DateTime.Now;
            var count = _context.SaveChanges();
            return count > 0;
        }

        /// <summary>
        /// Closes the database connection
        /// </summary>
        public virtual void Dispose()
        {
            _context.Dispose();
        }

        public IQueryable<TModel> BaseQuery() => _context.Set<TModel>().Where(x => x.DeletedOn == null);

        /// <summary>
        /// Checks, if item with the same id already exists
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool ItemExists(int id) => _context.Set<TModel>().Count(e => e.Id == id) > 0;
    }
}