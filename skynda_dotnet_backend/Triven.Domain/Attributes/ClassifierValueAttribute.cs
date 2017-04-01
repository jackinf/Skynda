using System;

namespace Triven.Domain.Attributes
{
    public class ClassifierValueAttribute : Attribute
    {
        public ClassifierValueAttribute(string name, string code, Type type)
        {
            Name = name;
            Code = code;
            ClassifierType = type;
        }
        public ClassifierValueAttribute(string name, string code)
        {
            Name = name;
            Code = code;
        }

        public ClassifierValueAttribute(string name, Type type)
        {
            Name = name;
            ClassifierType = type;
        }

        public ClassifierValueAttribute(string name)
        {
            Name = name;
        }

        public Type ClassifierType { get; }
        public string Code { get; }
        public string Name { get; }
        public Enum Enum { get; set; }
    }
}