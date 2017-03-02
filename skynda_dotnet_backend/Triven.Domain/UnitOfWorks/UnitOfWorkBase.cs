using System;

namespace Triven.Domain.UnitOfWorks
{
    public abstract class UnitOfWorkBase<TDbContext> : IDisposable
        where TDbContext : class, IDbContext
    {
        public TDbContext _context;

        protected UnitOfWorkBase()
        {
            _context = Activator.CreateInstance(typeof(TDbContext)) as TDbContext;
        }

        public void SaveChanges() => _context.SaveChanges();
        private bool _isDisposed;
        protected virtual void Dispose(bool isDisposing)
        {
            if (!_isDisposed && isDisposing)
                _context.Dispose();
            _isDisposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}