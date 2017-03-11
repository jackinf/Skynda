using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using Triven.Domain.Models.Base;
using Triven.Domain.Repositories.Base;
using Triven.Domain.Results;
using Triven.Domain.UnitOfWorks;
using Triven.Domain.Util;

namespace Triven.Data.EntityFramework.Repositories.Base
{
    /// <summary>
    /// Generic Create-Read-Update-Delete logic. It can make life much easier.
    /// </summary>
    /// <typeparam name="TModel"></typeparam>
    public abstract class BaseCrudRepository<TModel> : IBaseCrudRepository<TModel>
        where TModel : class, IAuditableBaseModel
    {

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

        protected virtual void OnBeforeDelete(TModel model)
        {
            model.DeletedOn = DateTime.Now;
        }

        /// <summary>
        /// Gets all the items from the database
        /// </summary>
        /// <returns></returns>
        public virtual IEnumerable<TModel> GetAll(IDbContext context = null)
        {
            var (dbContext, isDisposable) = DbContextHelper(context);

            try
            {
                return BaseQuery(dbContext).OrderBy(x => x.Id);
            }
            finally
            {
                if(isDisposable)
                    dbContext.Dispose();
            }
           
        }

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
        /// <param name="context">Should be ApplicationDbContext</param>
        /// <returns></returns>
        public virtual TModel Get(int id, IDbContext context = null) => BaseQuery(context).SingleOrDefault(m => m.Id == id);

        /// <summary>
        /// Adds new item to the database and saves changes
        /// </summary>
        /// <param name="model"></param>
        /// <param name="context">Should be ApplicationDbContext</param>
        /// <returns></returns>
        public virtual IResult<TModel> Add(TModel model, IDbContext context = null)
        {
            var(dbContext, isDisposable) = DbContextHelper(context);

            try
            {
                dbContext.Entry(model).State = EntityState.Added;
                dbContext.Set<TModel>().Add(model);

                model.CreatedOn = DateTime.Now;
                model.UpdatedOn = DateTime.Now;
                dbContext.SaveChanges();
                return OnCreateOrUpdateResult<TModel>.Factory.Success(model);
            }
            catch (DbUpdateException ex)
            {
                if (ItemExists(model.Id))
                    return OnCreateOrUpdateResult<TModel>.Factory.Fail(ex);
                throw;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (isDisposable)
                    dbContext.Dispose();
            }
        }   

        /// <summary>
        /// Updates an item in the database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model">Your mother</param>
        /// <param name="context">Should be ApplicationDbContext</param>
        /// <returns></returns>
        public virtual IResult<TModel> Update(int id, TModel model, IDbContext context = null)
        {
            var (dbContext, isDisposable) = DbContextHelper(context);

            try
            {

                dbContext.Entry(model).State = EntityState.Modified;
                dbContext.Entry(model).Property(x => x.CreatedOn).IsModified = false;

                model.UpdatedOn = DateTime.Now;
                model.ModifierUserIp = HttpContextManager.Current?.Request?.UserHostAddress;
                dbContext.SaveChanges();

                return OnCreateOrUpdateResult<TModel>.Factory.Success(model);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ItemExists(id))
                    return OnCreateOrUpdateResult<TModel>.Factory.Fail(ex);
                throw;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if(isDisposable)
                    dbContext.Dispose();
            }
        }


        /// <summary>
        /// Deletes an item in the database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="context">Should be ApplicationDbContext</param>
        /// <returns></returns>
        public virtual bool Delete(int id, IDbContext context = null)
        {

            var (dbContext, isDisposable) = DbContextHelper(context);

            try
            {
                var model = dbContext.Set<TModel>().SingleOrDefault(m => m.Id == id);

                if (model == null)
                    return false;

                dbContext.Entry(model).State = EntityState.Unchanged;
                dbContext.Entry(model).Property(x => x.DeletedOn).IsModified = true;

                OnBeforeDelete(model);

                var count = dbContext.SaveChanges();

                return count > 0;
            }
            finally
            {
                if(isDisposable)
                    dbContext.Dispose();
            }
            

        }

        public IQueryable<TModel> BaseQuery(IDbContext context)
        {
            var (dbContext, isDisposable) = DbContextHelper(context);

            try
            {
                return dbContext.Set<TModel>().Where(x => x.DeletedOn == null);
            }
            finally
            {
                if(isDisposable)
                    dbContext.Dispose();
            }
           
        }

        /// <summary>
        /// Checks, if item with the same id already exists
        /// </summary>
        /// <param name="id"></param>
        /// <param name="context">Should be ApplicationDbContext</param>
        /// <returns></returns>
        public bool ItemExists(int id, IDbContext context = null)
        {
            var (dbContext, isDisposable) = DbContextHelper(context);

            try
            {
                return dbContext.Set<TModel>().Count(e => e.Id == id) > 0;
            }
            finally
            {
                if(isDisposable)
                    dbContext.Dispose();
            }

        }

        /// <summary>
        /// Creates new ApplicationDbContext if not exists.
        /// </summary>
        /// <param name="context">ApplicationDbContext pls.</param>
        /// <returns></returns>
        private (ApplicationDbContext, bool) DbContextHelper(IDbContext context = null)
        {
            var isDisposable = false;
            ApplicationDbContext dbContext = context as ApplicationDbContext;

            if (dbContext == null)
            {
                dbContext = new ApplicationDbContext();
                isDisposable = true;
            }

            return (dbContext, isDisposable);
        }
    }
}