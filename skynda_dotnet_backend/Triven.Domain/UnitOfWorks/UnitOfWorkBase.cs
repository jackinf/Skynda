using System;

namespace Triven.Domain.UnitOfWorks
{
    public abstract class UnitOfWorkBase<TDbContext> : IDisposable
        where TDbContext : class, IDbContext
    {
        public TDbContext Context;

        protected UnitOfWorkBase()
        {
            Context = Activator.CreateInstance(typeof(TDbContext)) as TDbContext;
        }

        public void SaveChanges() => Context.SaveChanges();
        private bool _isDisposed;
        protected virtual void Dispose(bool isDisposing)
        {
            if (!_isDisposed && isDisposing)
                Context.Dispose();
            _isDisposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}