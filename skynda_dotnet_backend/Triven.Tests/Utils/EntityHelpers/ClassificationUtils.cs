using System;
using System.Linq;
using Triven.Data.EntityFramework.Models;

namespace Triven.FunctionalTests.Utils.EntityHelpers
{
    internal static class ClassificationUtils
    {
        public static Classification GetRandom()
        {
            using (var context = EntityFrameworkTestHelper.CreateContext())
            {
                Random rand = new Random();
                int toSkip = rand.Next(1, context.Classifications.Count());
                var classification = context.Classifications.OrderBy(r => Guid.NewGuid()).Skip(toSkip).Take(1).First();
                return classification;
            }
        }

        public static Classification GetRandomByType(int classificationTypeId)
        {
            using (var context = EntityFrameworkTestHelper.CreateContext())
            {
                Random rand = new Random();
                int toSkip = rand.Next(1, context.Classifications.Count(x => x.ClassificationTypeId == classificationTypeId));
                var classification = context.Classifications
                    .Where(x => x.ClassificationTypeId == classificationTypeId)
                    .OrderBy(r => Guid.NewGuid())
                    .Skip(toSkip)
                    .Take(1)
                    .First();
                return classification;
            }
        }
    }
}