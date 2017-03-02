using System;

namespace Triven.Domain.UnitOfWorks
{
    public interface IDbContext : IDisposable
    {
        int SaveChanges();
    }
}