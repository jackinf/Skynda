using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Triven.Domain.Attributes;

namespace Triven.Domain.Helpers
{
    public class ClassifierValue
    {
        private static readonly object CacheSync = new object();
        private static readonly Dictionary<string, ClassifierValueAttribute> cache = new Dictionary<string, ClassifierValueAttribute>();

        public static ClassifierValueAttribute EnumValue(Enum value)
        {
            Type type = value.GetType();
            var name = value.ToString();
            var key = type.Name + "_" + name;

            lock (CacheSync)
            {
                if (cache.ContainsKey(key))
                    return cache[key];

                FieldInfo fi = type.GetField(name);
                if (fi == null)
                    return new ClassifierValueAttribute(string.Empty);

                var attr = (ClassifierValueAttribute)fi.GetCustomAttributes(typeof(ClassifierValueAttribute), false).SingleOrDefault();
                if (attr == null)
                    attr = new ClassifierValueAttribute(string.Empty);
                attr.Enum = value;
                cache[key] = attr;
                return attr;
            }
        }

        public static IList<ClassifierValueAttribute> AllClassifiers<T>() => Enum.GetValues(typeof(T)).Cast<Enum>().Select(EnumValue).ToList();
    }
}