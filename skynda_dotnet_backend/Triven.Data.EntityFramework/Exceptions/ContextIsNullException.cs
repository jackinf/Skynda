using System;

namespace Triven.Data.EntityFramework.Exceptions
{
    public class ContextIsNullException : Exception
    {
        public ContextIsNullException() : base("Context is required to proceed")
        {
        }
    }
}