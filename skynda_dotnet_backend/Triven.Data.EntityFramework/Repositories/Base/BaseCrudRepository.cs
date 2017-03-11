using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using Triven.Data.EntityFramework.Exceptions;
using System.Reflection;
using Triven.Data.EntityFramework.Models.Base;
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
            => HandleWithContext(context, dbContext => BaseQuery(dbContext).OrderBy(x => x.Id).ToList());

        /// <summary>
        /// Gets all the items from the database by page size
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public virtual IEnumerable<TModel> GetPagedList(int pageNumber = 1, int pageSize = 25) 
            => GetAll().Skip(pageSize * (pageNumber - 1)).Take(pageSize);

        /// <summary>
        /// Gets a single item from the databse
        /// </summary>
        /// <param name="id"></param>
        /// <param name="context">Should be ApplicationDbContext</param>
        /// <returns></returns>
        public virtual TModel Get(int id, IDbContext context = null) 
            => HandleWithContext(context, dbContext => BaseQuery(dbContext).SingleOrDefault(m => m.Id == id));

        /// <summary>
        /// Adds new item to the database and saves changes
        /// </summary>
        /// <param name="model"></param>
        /// <param name="context">Should be ApplicationDbContext</param>
        /// <returns></returns>
        public virtual IResult<TModel> Add(TModel model, IDbContext context = null)
        {
            var (dbContext, isDisposable) = DbContextHelper(context);

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
                model.UpdatedOn = DateTime.Now;
                model.ModifierUserIp = HttpContextManager.Current?.Request?.UserHostAddress;

                UpdateWithComplexTypes(model, dbContext);

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
                if (isDisposable)
                    dbContext.Dispose();
            }
        }

        private static void UpdateWithComplexTypes(TModel model, ApplicationDbContext dbContext)
        {
            IEnumerable<PropertyInfo> complexProps = model.GetType()
                .GetProperties()
                .Where(p => p.PropertyType.BaseType == typeof(AuditableModel));

            Dictionary<string, int?> updateFkValues = new Dictionary<string, int?>();

            var complexPropertyInfos = complexProps as IList<PropertyInfo> ?? complexProps.ToList();

            foreach (PropertyInfo prop in complexPropertyInfos)
            {
                var val = (AuditableModel) prop.GetValue(model);
                if (val == null)
                {
                    updateFkValues.Add(prop.Name, null);
                }
                else
                {
                    updateFkValues.Add(prop.Name, val.Id);
                }

                prop.SetValue(model, null);
            }

            // dbContext creation may need to move to here as per below working example
            var dbObj = dbContext.Set(typeof(TModel)).Find(new object[] {model.Id}); //this also differs from example

            //update the simple values
            dbContext.Entry(dbObj).CurrentValues.SetValues(model);

            //update complex values
            foreach (PropertyInfo prop in complexPropertyInfos)
            {
                Object propValue = null;
                if (updateFkValues[prop.Name].HasValue)
                {
                    propValue = dbContext.Set(prop.PropertyType).Find(new object[] {updateFkValues[prop.Name]});
                }

                prop.SetValue(dbObj, propValue);

                if (propValue != null)
                {
                    dbContext.Entry(propValue).State = EntityState.Unchanged;
                }
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
                if (isDisposable)
                    dbContext.Dispose();
            }


        }

        protected IQueryable<TModel> BaseQuery(ApplicationDbContext dbContext)
        {
            if (dbContext == null)
                throw new ContextIsNullException();
            return dbContext.Set<TModel>().Where(x => x.DeletedOn == null);
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
                if (isDisposable)
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

        /// <summary>
        /// Wrapper to create and dispose a context when needed
        /// </summary>
        /// <param name="context">ApplicationDbContext pls.</param>
        /// <param name="action"></param>
        /// <returns></returns>
        private T HandleWithContext<T>(IDbContext context, Func<ApplicationDbContext, T> action)
        {
            var isDisposable = false;
            ApplicationDbContext dbContext = (ApplicationDbContext) context;    // all or nothing. We exclude every possibility for another database context.

            if (dbContext == null)
            {
                dbContext = new ApplicationDbContext();
                isDisposable = true;
            }

            try
            {
                return action(dbContext);
            }
            finally
            {
                if (isDisposable)
                    dbContext.Dispose();
            }
        }
    }
}