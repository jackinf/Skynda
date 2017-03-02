using System.Data.Entity;
using Triven.Domain.UnitOfWorks;

namespace Triven.Data.EntityFramework.UnitOfWorks
{
    public class UnitOfWorkEntityBase : UnitOfWorkBase<ApplicationDbContext>
    {
        private DbContextTransaction _transaction;

        public void BeginTransaction() => _transaction = _context.Database.BeginTransaction();
        public void Commit() => _transaction.Commit();
    }
}