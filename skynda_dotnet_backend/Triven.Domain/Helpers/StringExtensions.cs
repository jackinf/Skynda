using System;

namespace Triven.Domain.Extensions
{
    public static class StringExtensions
    {
        public static T ParseEnum<T>(this string value)
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }

        public static bool IsNullOrEmpty(this string input)
        {
            return input == null || input.Length < 1 || input.Trim().Length < 1;
        }
    }
}
