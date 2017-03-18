using System;

namespace Triven.Domain.Helpers
{
    public static class StringExtensions
    {
        public static T ParseEnum<T>(this string value)
        {
            if (value == null)
                value = "0";
            return (T)Enum.Parse(typeof(T), value, true);
        }
    }
}
