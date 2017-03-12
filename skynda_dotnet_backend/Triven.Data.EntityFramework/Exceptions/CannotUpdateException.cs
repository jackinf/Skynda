using System;

namespace Triven.Data.EntityFramework.Exceptions
{
    public class CannotUpdateException : Exception
    {
        public CannotUpdateException(string message) : base($"Cannot proceed with update. Reason: {message}")
        {
        }
    }
}